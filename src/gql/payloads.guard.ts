import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class PayloadsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    return true;
  }
}
