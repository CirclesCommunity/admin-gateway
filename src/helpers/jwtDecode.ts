import { GraphQLError } from 'graphql'
import { JsonWebTokenError, JwtPayload, TokenExpiredError, verify } from 'jsonwebtoken';

export function DecodeJWT(token: string, secret: string): any {
  try {
    return verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new GraphQLError("Token expired", {
        extensions: {
          description: "Token expired",
          error: "TOKEN_EXPIRED",
          status: "401"
        }
      })
    } else if (error instanceof JsonWebTokenError) {
      throw new GraphQLError("Invalid token", {
        extensions: {
          description: "Invalid token",
          error: "INVALID_TOKEN",
          status: "401"
        }
      })
    } else {
      throw error
    }
  }
}