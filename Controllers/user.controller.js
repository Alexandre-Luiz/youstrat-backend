import bcrypt from 'bcrypt';
import userService from '../services/user.service.js';
import { checkForSpecialCharacters } from '../helpers/signupValidation.js';
import { checkForSpace } from '../helpers/signupValidation.js';
import * as dotenv from 'dotenv';
dotenv.config();

// Maximum number of allowed login attempts
const MAX_LOGIN_ATTEMPTS = 3;

// ok - Disabled for now
// async function signup(req, res, next) {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res.status(422).json({ message: 'Fill username and password' });
//     }

//     // Validating username
//     if (checkForSpecialCharacters(username)) {
//       throw new Error('Invalid username. Only - and _ are allowed');
//     }
//     if (checkForSpace(username)) {
//       throw new Error('Invalid username. Spaces are not allowed');
//     }
//     // Validating password
//     if (checkForSpace(password)) {
//       throw new Error('Invalid password. Spaces are not allowed');
//     }

//     // hashing password
//     const salt = await bcrypt.genSalt(12);
//     const passwordHash = await bcrypt.hash(password, salt);

//     // building data to persist on db
//     const data = {
//       username: username,
//       password: passwordHash,
//       // role: 'regular',
//       role: 'admin',
//     };

//     const user = await userService.createUser(data);

//     if (user) {
//       req.session.user = {
//         message: 'User created and successfully logged in',
//         userId: user.userId,
//         username: user.username,
//         role: user.role,
//       };
//       return res.status(200).json(req.session.user);
//     } else {
//       return res.status(409).json({ status: 409, message: 'Signup failed' });
//     }
//   } catch (err) {
//     next(err);
//   }
// }

// ok
async function login(req, res, next) {
  try {
    const { username, password, userTimezone } = req.body;

    const user = await userService.getUserByUsername(username);

    // Checks if the user exists
    if (user) {
      // Check if the account is locked
      if (user.isLocked) {
        const now = new Date();
        if (now > user.lockoutTime) {
          // Unlock the account if the lockout time has passed
          await userService.unlockAccount(user.userId);
        } else {
          // Return locked status if still within the lockout time
          return res.status(401).json({
            status: 401,
            message: 'Account locked due to too many failed login attempts.',
          });
        }
      }

      // Checks the password typed and the one in DB if the account is not locked
      const checkPass = await bcrypt.compare(password, user.password);

      if (checkPass) {
        // Reset login attempts upon sucessful login
        await userService.resetLoginAttempts(user.userId);

        req.session.user = {
          message: 'User successfully logged in',
          userId: user.userId,
          username: user.username,
          role: user.role,
        };
        return res.status(200).json(req.session.user);
      } else {
        // Increment failed login attempts
        await userService.incrementLoginAttempts(user.userId);

        // Reload user from the database to get the updated loginAttempts value
        const updatedUser = await userService.getUserByUsername(username);

        // Check if the user exceeded the maximum allowed login attempts
        if (updatedUser.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
          // Lock the account and set a lockout time
          await userService.lockAccount(updatedUser.userId, userTimezone);
          return res.status(401).json({
            status: 401,
            message:
              'Account locked due to too many failed login attempts. Wait 15 minutes and try again',
          });
        }
        return res.status(401).json({
          status: 401,
          message: `Wrong password. You have ${
            MAX_LOGIN_ATTEMPTS - updatedUser.loginAttempts
          } attempt(s) before your account is locked for 15 minutes`,
        });
      }
    } else {
      return res.status(401).json({ status: 401, message: 'User not found' });
    }
  } catch (err) {
    next(err);
  }
}

// ok
async function signout(req, res, next) {
  if (req.session.user) {
    req.session.destroy(function (err) {
      res.status(200).json({ message: 'Logout successful' });
    });
  } else {
    res.status(401).json({ status: 401, message: 'Not authenticated' });
  }
}

// ok
async function getUserSession(req, res, next) {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({ status: 401, message: 'Not authenticated' });
  }
}

export default {
  signup,
  login,
  getUserSession,
  signout,
};
