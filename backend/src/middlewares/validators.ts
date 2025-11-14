import { body } from 'express-validator';

export const signupValidator = [
    body('email')
        .isEmail().withMessage('Email invalide')
        .normalizeEmail(),

    body('password')
        .isLength({ min: 8 }).withMessage('Mot de passe min 8 caractères')
        .matches(/[a-z]/).withMessage('Doit contenir une minuscule')
        .matches(/[A-Z]/).withMessage('Doit contenir une majuscule')
        .matches(/[0-9]/).withMessage('Doit contenir un chiffre')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Doit contenir un symbole'),

    body('passwordConfirm')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Les mots de passe ne correspondent pas'),

    body('fullName')
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('Nom entre 2 et 100 caractères'),

    body('organizationId')
        .optional()
        .isUUID().withMessage('ID organisation invalide')
];

export const LoginValidator = [
    body('email')
        .isEmail().withMessage("Email invalide")
        .normalizeEmail(),
    body('password')
        .isString()
        .isLength({ min: 1 })
        .withMessage("Mot de passe requis")
]