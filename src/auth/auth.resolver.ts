import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

}
