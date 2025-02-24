import { UserRole } from '@prisma/client';
import { HashingService, userService } from '../services';

export async function createAdminIfNotExists() {
  const name = process.env.ADMIN_NAME!;
  const email = process.env.ADMIN_EMAIL!;
  const password = process.env.ADMIN_PASSWORD!;
  const phone = process.env.ADMIN_PHONE!;

  const admin = await userService.findOne({ email });

  if (!admin) {
    console.log('Creating admin user...');

    const hashedPassword = await HashingService.hash(password);

    await userService.createOne({
      name,
      email,
      password: hashedPassword,
      isVerified: true,
      phone,
      role: UserRole.ADMIN,
    });
  }
}
