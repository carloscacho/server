/**
 * CPF Value Object - encapsulates CPF validation logic
 */
export class Cpf {
    private readonly value: string;

    private constructor(cpf: string) {
        this.value = cpf;
    }

    static create(cpf: string): Cpf {
        const cleanCpf = cpf.replace(/\D/g, '');

        if (!Cpf.isValid(cleanCpf)) {
            throw new Error('CPF inválido');
        }

        return new Cpf(cleanCpf);
    }

    static isValid(cpf: string): boolean {
        const cleanCpf = cpf.replace(/\D/g, '');

        if (cleanCpf.length !== 11) {
            return false;
        }

        // Check for known invalid patterns
        if (/^(\d)\1+$/.test(cleanCpf)) {
            return false;
        }

        // Validate check digits
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
        }
        let remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cleanCpf.charAt(9))) return false;

        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cleanCpf.charAt(10))) return false;

        return true;
    }

    getValue(): string {
        return this.value;
    }

    getFormatted(): string {
        return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    equals(other: Cpf): boolean {
        return this.value === other.value;
    }
}
