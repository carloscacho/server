/**
 * Email Value Object - encapsulates email validation
 */
export class Email {
    private readonly value: string;

    private constructor(email: string) {
        this.value = email.toLowerCase().trim();
    }

    static create(email: string): Email {
        if (!Email.isValid(email)) {
            throw new Error('Email inválido');
        }
        return new Email(email);
    }

    static isValid(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    getValue(): string {
        return this.value;
    }

    equals(other: Email): boolean {
        return this.value === other.value;
    }
}
