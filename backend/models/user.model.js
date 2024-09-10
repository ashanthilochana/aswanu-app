export class User {
    constructor(firstName, lastName, email, role, phoneNo, createdAt, region, district, address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.phoneNo = phoneNo;
        this.createdAt = createdAt;
        this.region = region;
        this.district = district;
        this.address = address;
    }

    toString() {
        return `${this.firstName} ${this.lastName}, ${this.email}, ${this.role}, ${this.phoneNo}, 
                ${this.createdAt}, ${this.region}, ${this.district}, ${this.address}`;
    }
}

// Firestore data converter
export const userConverter = {
    toFirestore: (user) => {
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            phoneNo: user.phoneNo,
            createdAt: user.createdAt,
            region: user.region,
            district: user.district,
            address: user.address
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(
            data.firstName, 
            data.lastName, 
            data.email, 
            data.role, 
            data.phoneNo, 
            data.createdAt, 
            data.region, 
            data.district, 
            data.address
        );
    }
};
