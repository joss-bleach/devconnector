import { UnauthorizedException } from '@nestjs/common';

export const userHasPermission = (currentUserId: string, dbUserId) => {
  if (currentUserId.toString() !== dbUserId.toString()) {
    throw new UnauthorizedException(
      "User doesn't have access to write, edit or delete this.",
    );
  }
};
