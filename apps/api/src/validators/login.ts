import { IsEmail, IsDefined } from 'class-validator';

export class Login {
  @IsEmail(
    {},
    {
      message: 'Please enter a valid email'
    }
  )
  @IsDefined({
    message: 'Email is required'
  })
  email: string;
  @IsDefined({
    message: 'Password is required'
  })
  password: string;
}
