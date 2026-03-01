import { User } from "../models/user";

export const seedAdmin = async(): Promise<void> => {
    try {
        const adminExists = await User.findOne({ role: "admin" });
        if (adminExists) {
            console.log("Admin already exists, skipping seed");
            return;
        }
        const adminName = process.env["ADMIN_NAME"];
        const adminPassword = process.env["ADMIN_PASSWORD"];
        const adminEmail = process.env["ADMIN_EMAIL"];

        if (!adminEmail || !adminPassword) {
            console.warn("ADMIN_EMAIL or ADMIN_PASSWORD not set");
            return;
        }
        
        await User.create({
            name: adminName,
            email: adminEmail,
            password: adminPassword,
            role: "admin"
        });
        console.log(`[SECURITY] Admin CREATED: ${adminEmail}`);
    } catch (error) {
        console.error("Error seeding admin:", error);
    }
}