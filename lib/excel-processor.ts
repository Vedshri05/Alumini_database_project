import { Alumni, ImportError, ENGINEERING_BRANCHES, EngineeringBranch } from './types';

// Excel processing utility - uses client-side parsing
export class ExcelProcessor {
  private static cleanString(str: string): string {
    return str?.toString().trim().toLowerCase() || '';
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private static isValidYear(year: any): boolean {
    const yearNum = parseInt(year);
    const currentYear = new Date().getFullYear();
    return yearNum >= 1950 && yearNum <= currentYear + 5;
  }

  private static isValidBranch(branch: string): branch is EngineeringBranch {
    return Object.keys(ENGINEERING_BRANCHES).includes(branch.toUpperCase());
  }

  private static getBranchCode(input: string): EngineeringBranch | null {
    const upperInput = input.toUpperCase().trim();
    if (Object.keys(ENGINEERING_BRANCHES).includes(upperInput)) {
      return upperInput as EngineeringBranch;
    }
    // Try to match by full name
    for (const [code, fullName] of Object.entries(ENGINEERING_BRANCHES)) {
      if (fullName.toUpperCase() === upperInput) {
        return code as EngineeringBranch;
      }
    }
    return null;
  }

  static parseCSV(csvContent: string): { records: Partial<Alumni>[]; errors: ImportError[] } {
    const lines = csvContent.split('\n').filter(line => line.trim());
    const records: Partial<Alumni>[] = [];
    const errors: ImportError[] = [];

    if (lines.length < 2) {
      return { records: [], errors: [{ row: 0, field: 'file', value: '', error: 'CSV file is empty' }] };
    }

    const headers = lines[0].split(',').map(h => this.cleanString(h));
    const requiredFields = ['name', 'email'];

    // Validate headers
    const hasRequiredFields = requiredFields.every(field => 
      headers.includes(field)
    );

    if (!hasRequiredFields) {
      return {
        records: [],
        errors: [{
          row: 0,
          field: 'headers',
          value: headers.join(', '),
          error: `Missing required fields: ${requiredFields.join(', ')}`
        }]
      };
    }

    // Process data rows
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',').map(v => v.trim());
      const record: Partial<Alumni> = { id: `alumni_${Date.now()}_${i}` };
      let hasError = false;

      headers.forEach((header, index) => {
        const value = values[index] || '';

        switch (header) {
          case 'name':
            if (!value) {
              errors.push({ row: i + 1, field: 'name', value, error: 'Name is required' });
              hasError = true;
            } else {
              record.name = value;
            }
            break;
          case 'email':
            if (!value || !this.isValidEmail(value)) {
              errors.push({ row: i + 1, field: 'email', value, error: 'Invalid email format' });
              hasError = true;
            } else {
              record.email = value.toLowerCase();
            }
            break;
          case 'phone':
            record.phone = value || undefined;
            break;
          case 'graduationyear':
          case 'graduation year':
          case 'grad year':
            if (value && !this.isValidYear(value)) {
              errors.push({ row: i + 1, field: 'graduationYear', value, error: 'Invalid graduation year' });
              hasError = true;
            } else {
              record.graduationYear = value ? parseInt(value) : new Date().getFullYear();
            }
            break;
          case 'branch':
          case 'engineering branch':
            if (!value) {
              errors.push({ row: i + 1, field: 'branch', value, error: 'Branch is required. Valid options: CS, IT, ENTC, ECE, AIDS' });
              hasError = true;
            } else {
              const branchCode = this.getBranchCode(value);
              if (branchCode) {
                record.branch = branchCode;
              } else {
                errors.push({ row: i + 1, field: 'branch', value, error: 'Invalid branch. Valid options: CS, IT, ENTC, ECE, AIDS' });
                hasError = true;
              }
            }
            break;
          case 'currentposition':
          case 'current position':
          case 'position':
            record.currentPosition = value || undefined;
            break;
          case 'company':
            record.company = value || undefined;
            break;
          case 'location':
            record.location = value || undefined;
            break;
          case 'linkedinurl':
          case 'linkedin':
          case 'linkedin url':
            record.linkedinUrl = value || undefined;
            break;
        }
      });

      // Set default values
      if (!record.graduationYear) record.graduationYear = new Date().getFullYear();
      if (!record.branch) record.branch = 'CS';

      record.createdAt = new Date();
      record.updatedAt = new Date();

      if (!hasError && record.name && record.email) {
        records.push(record);
      }
    }

    return { records, errors };
  }

  static generateCSVTemplate(): string {
    const headers = ['Name', 'Email', 'Phone', 'Graduation Year', 'Branch', 'Current Position', 'Company', 'Location', 'LinkedIn URL'];
    const templateRow = ['John Doe', 'john@example.com', '+1234567890', '2020', 'CS', 'Software Engineer', 'Tech Corp', 'San Francisco', 'linkedin.com/in/johndoe'];
    
    return [headers, templateRow].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  }

  static downloadCSVTemplate(): void {
    const csv = this.generateCSVTemplate();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'alumni-import-template.csv';
    link.click();
  }
}
