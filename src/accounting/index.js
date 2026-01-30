#!/usr/bin/env node

/**
 * Account Management System - Node.js Implementation
 * 
 * This is a modernized version of the legacy COBOL Account Management System.
 * It preserves the original business logic, data integrity, and menu options.
 * 
 * Architecture:
 * - DataStorage: Manages persistent account balance (equivalent to data.cob)
 * - Operations: Implements business logic for account operations (equivalent to operations.cob)
 * - MainProgram: Handles user interface and menu loop (equivalent to main.cob)
 */

const readline = require('readline');

// ============================================================================
// DATA STORAGE MODULE (equivalent to data.cob - DataProgram)
// ============================================================================

class DataStorage {
    constructor() {
        // Initial balance set to $1000.00 (matching COBOL STORAGE-BALANCE)
        this.storageBalance = 1000.00;
    }

    /**
     * Read the current balance from storage
     * @returns {number} Current account balance
     */
    read() {
        return this.storageBalance;
    }

    /**
     * Write a new balance to storage
     * @param {number} balance - New balance to store
     */
    write(balance) {
        this.storageBalance = balance;
    }
}

// ============================================================================
// OPERATIONS MODULE (equivalent to operations.cob - Operations)
// ============================================================================

class Operations {
    constructor(dataStorage) {
        this.dataStorage = dataStorage;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    /**
     * View current account balance
     * @returns {Promise<void>}
     */
    async viewBalance() {
        const balance = this.dataStorage.read();
        console.log(`Current balance: ${this.formatBalance(balance)}`);
    }

    /**
     * Credit (deposit) money to the account
     * @returns {Promise<void>}
     */
    async creditAccount() {
        return new Promise((resolve) => {
            this.rl.question('Enter credit amount: ', (input) => {
                const amount = parseFloat(input);
                
                if (isNaN(amount) || amount < 0) {
                    console.log('Invalid amount. Please enter a valid positive number.');
                    resolve();
                    return;
                }

                // Read current balance
                let currentBalance = this.dataStorage.read();
                
                // Add credit amount
                currentBalance += amount;
                
                // Validate maximum balance limit (999999.99)
                if (currentBalance > 999999.99) {
                    console.log('Error: Maximum balance limit exceeded.');
                    resolve();
                    return;
                }
                
                // Write updated balance
                this.dataStorage.write(currentBalance);
                
                console.log(`Amount credited. New balance: ${this.formatBalance(currentBalance)}`);
                resolve();
            });
        });
    }

    /**
     * Debit (withdraw) money from the account
     * @returns {Promise<void>}
     */
    async debitAccount() {
        return new Promise((resolve) => {
            this.rl.question('Enter debit amount: ', (input) => {
                const amount = parseFloat(input);
                
                if (isNaN(amount) || amount < 0) {
                    console.log('Invalid amount. Please enter a valid positive number.');
                    resolve();
                    return;
                }

                // Read current balance
                const currentBalance = this.dataStorage.read();
                
                // Check for sufficient funds
                if (currentBalance >= amount) {
                    // Subtract debit amount
                    const newBalance = currentBalance - amount;
                    
                    // Write updated balance
                    this.dataStorage.write(newBalance);
                    
                    console.log(`Amount debited. New balance: ${this.formatBalance(newBalance)}`);
                } else {
                    console.log('Insufficient funds for this debit.');
                }
                
                resolve();
            });
        });
    }

    /**
     * Format balance for display (matching COBOL format with 2 decimal places)
     * @param {number} balance - Balance to format
     * @returns {string} Formatted balance string
     */
    formatBalance(balance) {
        return balance.toFixed(2).padStart(10, '0');
    }

    /**
     * Close the readline interface
     */
    close() {
        this.rl.close();
    }
}

// ============================================================================
// MAIN PROGRAM (equivalent to main.cob - MainProgram)
// ============================================================================

class MainProgram {
    constructor() {
        this.dataStorage = new DataStorage();
        this.operations = new Operations(this.dataStorage);
        this.continueFlag = true;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    /**
     * Display the main menu
     */
    displayMenu() {
        console.log('--------------------------------');
        console.log('Account Management System');
        console.log('1. View Balance');
        console.log('2. Credit Account');
        console.log('3. Debit Account');
        console.log('4. Exit');
        console.log('--------------------------------');
    }

    /**
     * Process user menu choice
     * @param {string} choice - User's menu selection
     * @returns {Promise<void>}
     */
    async processChoice(choice) {
        const userChoice = parseInt(choice);

        switch (userChoice) {
            case 1:
                await this.operations.viewBalance();
                break;
            case 2:
                await this.operations.creditAccount();
                break;
            case 3:
                await this.operations.debitAccount();
                break;
            case 4:
                this.continueFlag = false;
                break;
            default:
                console.log('Invalid choice, please select 1-4.');
                break;
        }
    }

    /**
     * Main program loop
     */
    async run() {
        while (this.continueFlag) {
            this.displayMenu();
            
            const choice = await new Promise((resolve) => {
                this.rl.question('Enter your choice (1-4): ', resolve);
            });

            await this.processChoice(choice);
        }

        console.log('Exiting the program. Goodbye!');
        this.operations.close();
        this.rl.close();
    }
}

// ============================================================================
// APPLICATION ENTRY POINT
// ============================================================================

// Create and run the main program
const app = new MainProgram();
app.run().catch((error) => {
    console.error('An error occurred:', error);
    process.exit(1);
});
