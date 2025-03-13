"use server"

import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core"
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common"
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en"

// Initialize zxcvbn with options
const options = {
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
}

zxcvbnOptions.setOptions(options)

/**
 * Enhanced password strength check using zxcvbn
 */
export async function checkPasswordStrength(
  password: string,
  userInputs: string[] = [],
): Promise<{
  strong: boolean
  score: number
  feedback: {
    warning: string
    suggestions: string[]
  }
}> {
  // Use zxcvbn for comprehensive password strength analysis
  const result = zxcvbn(password, userInputs)

  // Score of 3 or 4 is considered strong (on a scale of 0-4)
  const isStrong = result.score >= 3

  return {
    strong: isStrong,
    score: result.score,
    feedback: {
      warning: result.feedback.warning || "",
      suggestions: result.feedback.suggestions || [],
    },
  }
}

/**
 * Server-side password validation
 */
export async function validatePassword(
  password: string,
  userInputs: string[] = [],
): Promise<{
  valid: boolean
  message?: string
}> {
  // Basic length check
  if (password.length < 8) {
    return {
      valid: false,
      message: "Password must be at least 8 characters long",
    }
  }

  // Check for common patterns
  const commonPatterns = /^(password|123456|qwerty|admin|welcome|letmein)$/i
  if (commonPatterns.test(password)) {
    return {
      valid: false,
      message: "Password is too common and easily guessable",
    }
  }

  // Use zxcvbn for comprehensive check
  const strengthResult = await checkPasswordStrength(password, userInputs)

  if (!strengthResult.strong) {
    return {
      valid: false,
      message: strengthResult.feedback.warning || "Password is not strong enough",
    }
  }

  return { valid: true }
}

