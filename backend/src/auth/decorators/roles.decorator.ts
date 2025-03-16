import { SetMetadata } from '@nestjs/common';

// defines a custom decorator for role  authorization

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
