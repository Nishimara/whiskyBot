module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "ignorePatterns": [".eslintrc.js"],
    "extends": [ "eslint:recommended" ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "@stylistic/ts"
    ],
    "rules": {
        "@stylistic/ts/block-spacing": ["error", "always"],
        "@stylistic/ts/brace-style": ["error", "1tbs"],
        "@stylistic/ts/comma-dangle": ["error", "never"],
        "@stylistic/ts/comma-spacing": ["error", 
            { "before": false, "after": true }
        ],
        "@stylistic/ts/func-call-spacing": ["error", "never"],
        "@stylistic/ts/key-spacing": ["error", 
            { "beforeColon": false, "afterColon": true, "mode": "strict" }
        ],
        "@stylistic/ts/keyword-spacing": ["error", 
            { "before": true, "after": true }
        ],
        "@stylistic/ts/lines-around-comment": ["warn"],
        "@stylistic/ts/lines-between-class-members": ["error", "always"],
        "@stylistic/ts/member-delimiter-style": ["error"],
        "@stylistic/ts/no-extra-parens": ["error", "all"],
        "@stylistic/ts/no-extra-semi": ["error"],
        "@stylistic/ts/object-curly-spacing": ["error", "always"],
        "@stylistic/ts/padding-line-between-statements": ["error", 
            { "blankLine": "always", "prev": "*", "next": "return"},
            { "blankLine": "always", "prev": [ "const", "let", "var" ], "next": "*" },
            { "blankLine": "any", "prev": [ "const", "let", "var" ], "next": [ "const", "let", "var" ] }
        ],
        "@stylistic/ts/quotes": ["error", "single"],
        "@stylistic/ts/semi": ["error", "always"],
        "@stylistic/ts/space-before-blocks": ["error", "always"],
        "@stylistic/ts/space-before-function-paren": ["error", "never"],
        "@stylistic/ts/space-infix-ops": ["error"],
        "@stylistic/ts/type-annotation-spacing": ["error", 
            { "before": false, "after": true }
        ],
        "linebreak-style": ["error", "unix"]
    }
}
