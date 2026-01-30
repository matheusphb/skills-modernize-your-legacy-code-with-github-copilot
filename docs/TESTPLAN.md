# Test Plan - Student Account Management System

## Overview
This test plan covers all business logic and functional requirements of the COBOL Student Account Management System. It is designed to validate functionality with business stakeholders and will serve as the basis for creating unit and integration tests during the Node.js migration.

**Initial Account Balance:** $1,000.00

---

## Test Cases

### 1. Menu and Navigation Tests

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|--------------|----------------------|----------------|------------|-----------------|---------------|--------|----------|
| TC-001 | Display Main Menu | Application started | 1. Launch application | Menu displays with 4 options:<br>1. View Balance<br>2. Credit Account<br>3. Debit Account<br>4. Exit | | | |
| TC-002 | Select Valid Menu Option - View Balance | Application running, main menu displayed | 1. Enter "1"<br>2. Press Enter | System accepts input and calls View Balance operation | | | |
| TC-003 | Select Valid Menu Option - Credit | Application running, main menu displayed | 1. Enter "2"<br>2. Press Enter | System accepts input and calls Credit Account operation | | | |
| TC-004 | Select Valid Menu Option - Debit | Application running, main menu displayed | 1. Enter "3"<br>2. Press Enter | System accepts input and calls Debit Account operation | | | |
| TC-005 | Select Valid Menu Option - Exit | Application running, main menu displayed | 1. Enter "4"<br>2. Press Enter | System displays "Exiting the program. Goodbye!" and terminates | | | |
| TC-006 | Select Invalid Menu Option (0) | Application running, main menu displayed | 1. Enter "0"<br>2. Press Enter | System displays "Invalid choice, please select 1-4." and redisplays menu | | | |
| TC-007 | Select Invalid Menu Option (5) | Application running, main menu displayed | 1. Enter "5"<br>2. Press Enter | System displays "Invalid choice, please select 1-4." and redisplays menu | | | |
| TC-008 | Select Invalid Menu Option (Letter) | Application running, main menu displayed | 1. Enter "A"<br>2. Press Enter | System displays "Invalid choice, please select 1-4." and redisplays menu | | | |
| TC-009 | Menu Loop Continues After Operation | Application running, operation completed | 1. Complete any operation (View/Credit/Debit)<br>2. Observe menu | Main menu is redisplayed for next operation | | | |

---

### 2. View Balance Tests

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|--------------|----------------------|----------------|------------|-----------------|---------------|--------|----------|
| TC-101 | View Initial Balance | Fresh application start, no transactions | 1. Select option "1" from menu | System displays "Current balance: 1000.00" | | | Initial balance is $1,000.00 |
| TC-102 | View Balance After Credit | Account has $1,000.00, credited $250.00 | 1. Complete credit of $250.00<br>2. Select option "1" | System displays "Current balance: 1250.00" | | | |
| TC-103 | View Balance After Debit | Account has $1,000.00, debited $300.00 | 1. Complete debit of $300.00<br>2. Select option "1" | System displays "Current balance: 0700.00" | | | |
| TC-104 | View Balance After Multiple Transactions | Multiple credits and debits performed | 1. Credit $500.00<br>2. Debit $200.00<br>3. Credit $100.00<br>4. Select option "1" | System displays correct calculated balance: 1400.00 | | | |
| TC-105 | View Balance Returns to Menu | Any account balance | 1. Select option "1"<br>2. View displays balance | After displaying balance, menu is redisplayed | | | |

---

### 3. Credit Account Tests

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|--------------|----------------------|----------------|------------|-----------------|---------------|--------|----------|
| TC-201 | Credit Small Amount | Account balance $1,000.00 | 1. Select option "2"<br>2. Enter amount "50.00" | System displays "Amount credited. New balance: 1050.00" | | | |
| TC-202 | Credit Large Amount | Account balance $1,000.00 | 1. Select option "2"<br>2. Enter amount "5000.00" | System displays "Amount credited. New balance: 6000.00" | | | No upper limit validation |
| TC-203 | Credit Decimal Amount | Account balance $1,000.00 | 1. Select option "2"<br>2. Enter amount "123.45" | System displays "Amount credited. New balance: 1123.45" | | | |
| TC-204 | Credit Zero Amount | Account balance $1,000.00 | 1. Select option "2"<br>2. Enter amount "0.00" | System displays "Amount credited. New balance: 1000.00" | | | Balance unchanged |
| TC-205 | Credit Amount with Single Decimal | Account balance $1,000.00 | 1. Select option "2"<br>2. Enter amount "99.5" | System processes as $99.50 and displays "Amount credited. New balance: 1099.50" | | | |
| TC-206 | Multiple Sequential Credits | Account balance $1,000.00 | 1. Credit $100.00<br>2. Credit $200.00<br>3. Credit $300.00 | Final balance is $1,600.00 | | | |
| TC-207 | Credit Maximum Allowed Amount | Account balance $1,000.00 | 1. Select option "2"<br>2. Enter amount "998999.99" | System displays "Amount credited. New balance: 999999.99" | | | Max balance: $999,999.99 |
| TC-208 | Credit Prompt Display | Account balance $1,000.00 | 1. Select option "2" | System displays "Enter credit amount:" | | | |
| TC-209 | Credit Updates Storage Balance | Account balance $1,000.00 | 1. Credit $250.00<br>2. View balance | New balance persists at $1,250.00 | | | Tests data persistence |

---

### 4. Debit Account Tests - Sufficient Funds

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|--------------|----------------------|----------------|------------|-----------------|---------------|--------|----------|
| TC-301 | Debit Small Amount (Sufficient Funds) | Account balance $1,000.00 | 1. Select option "3"<br>2. Enter amount "50.00" | System displays "Amount debited. New balance: 0950.00" | | | |
| TC-302 | Debit Exact Balance Amount | Account balance $1,000.00 | 1. Select option "3"<br>2. Enter amount "1000.00" | System displays "Amount debited. New balance: 0000.00" | | | Balance becomes zero |
| TC-303 | Debit Decimal Amount (Sufficient Funds) | Account balance $1,000.00 | 1. Select option "3"<br>2. Enter amount "123.45" | System displays "Amount debited. New balance: 0876.55" | | | |
| TC-304 | Debit Zero Amount | Account balance $1,000.00 | 1. Select option "3"<br>2. Enter amount "0.00" | System displays "Amount debited. New balance: 1000.00" | | | Balance unchanged |
| TC-305 | Debit Amount Less Than Balance | Account balance $1,000.00 | 1. Select option "3"<br>2. Enter amount "999.99" | System displays "Amount debited. New balance: 0000.01" | | | |
| TC-306 | Multiple Sequential Debits (Sufficient Funds) | Account balance $1,000.00 | 1. Debit $100.00<br>2. Debit $200.00<br>3. Debit $300.00 | Final balance is $400.00 | | | |
| TC-307 | Debit Prompt Display | Account balance $1,000.00 | 1. Select option "3" | System displays "Enter debit amount:" | | | |
| TC-308 | Debit Updates Storage Balance | Account balance $1,000.00 | 1. Debit $250.00<br>2. View balance | New balance persists at $750.00 | | | Tests data persistence |

---

### 5. Debit Account Tests - Insufficient Funds

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|--------------|----------------------|----------------|------------|-----------------|---------------|--------|----------|
| TC-401 | Debit Exceeds Balance | Account balance $1,000.00 | 1. Select option "3"<br>2. Enter amount "1500.00" | System displays "Insufficient funds for this debit." | | | Transaction rejected |
| TC-402 | Balance Unchanged After Insufficient Funds | Account balance $1,000.00 | 1. Attempt debit of $1,500.00<br>2. View balance | Balance remains $1,000.00 | | | No change to balance |
| TC-403 | Debit Slightly Over Balance | Account balance $1,000.00 | 1. Select option "3"<br>2. Enter amount "1000.01" | System displays "Insufficient funds for this debit." | | | Even $0.01 over is rejected |
| TC-404 | Continue After Insufficient Funds | Account balance $1,000.00, insufficient funds error displayed | 1. Attempt debit of $1,500.00<br>2. Observe menu | Menu redisplays, user can continue operations | | | System continues normally |
| TC-405 | Successful Debit After Previous Insufficient Funds | Account balance $1,000.00 | 1. Attempt debit of $1,500.00 (rejected)<br>2. Attempt debit of $500.00 (within balance) | Second debit succeeds, displays "Amount debited. New balance: 0500.00" | | | |
| TC-406 | Insufficient Funds with Zero Balance | Account balance $0.00 | 1. Select option "3"<br>2. Enter any positive amount | System displays "Insufficient funds for this debit." | | | Cannot debit from zero balance |
| TC-407 | Insufficient Funds Does Not Call Write Operation | Account balance $1,000.00 | 1. Attempt debit of $2,000.00 | System validates before writing, no write occurs | | | Tests write protection |

---

### 6. Data Persistence and Integrity Tests

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|--------------|----------------------|----------------|------------|-----------------|---------------|--------|----------|
| TC-501 | Balance Persists Across Multiple Operations | Application running | 1. View balance (initial)<br>2. Credit $500<br>3. View balance<br>4. Debit $200<br>5. View balance | Each view shows cumulative balance:<br>$1,000.00 → $1,500.00 → $1,300.00 | | | |
| TC-502 | Credit Then Debit Sequence | Account balance $1,000.00 | 1. Credit $300.00<br>2. Debit $500.00<br>3. View balance | Final balance is $800.00 | | | |
| TC-503 | Debit Then Credit Sequence | Account balance $1,000.00 | 1. Debit $600.00<br>2. Credit $200.00<br>3. View balance | Final balance is $600.00 | | | |
| TC-504 | Data Read Operation Returns Current Balance | Balance has been modified | 1. Perform multiple transactions<br>2. View balance | Balance reflects all previous transactions | | | |
| TC-505 | Data Write Operation Updates Storage | Account balance $1,000.00 | 1. Credit $100.00<br>2. Immediately view balance | Balance is $1,100.00 | | | Write is immediate |

---

### 7. Boundary and Edge Case Tests

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|--------------|----------------------|----------------|------------|-----------------|---------------|--------|----------|
| TC-601 | Maximum Balance Limit | Account balance $999,000.00 | 1. Credit $999.99 | System handles maximum balance of $999,999.99 | | | Max supported: $999,999.99 |
| TC-602 | Minimum Balance (Zero) | Account balance $100.00 | 1. Debit $100.00<br>2. View balance | Balance displays as $0.00 | | | System supports zero balance |
| TC-603 | Penny Precision Credit | Account balance $1,000.00 | 1. Credit $0.01 | System displays "Amount credited. New balance: 1000.01" | | | Two decimal place precision |
| TC-604 | Penny Precision Debit | Account balance $1,000.00 | 1. Debit $0.01 | System displays "Amount debited. New balance: 0999.99" | | | Two decimal place precision |
| TC-605 | Leading Zeros in Balance Display | Account balance becomes $50.00 | 1. Set balance to $50.00<br>2. View balance | System displays balance with proper formatting | | | Check display format |
| TC-606 | Rapid Sequential Operations | Application running | 1. Perform 10 operations in sequence without viewing balance<br>2. View balance | Final balance is mathematically correct | | | Tests data integrity |

---

### 8. Integration Tests

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|--------------|----------------------|----------------|------------|-----------------|---------------|--------|----------|
| TC-701 | Main → Operations → Data Flow | Application running | 1. Select operation from main menu | Call chain executes: main.cob → operations.cob → data.cob | | | Tests module integration |
| TC-702 | Operations Calls Data for Read | Any operation requiring balance | 1. View balance or perform transaction | Operations module successfully calls DataProgram with 'READ' | | | |
| TC-703 | Operations Calls Data for Write | Credit or successful debit operation | 1. Complete credit or valid debit | Operations module successfully calls DataProgram with 'WRITE' | | | |
| TC-704 | Data Module Returns Correct Values | Any read operation | 1. Request balance read | Data module returns current STORAGE-BALANCE value | | | |
| TC-705 | Data Module Updates Storage | Any write operation | 1. Perform credit or debit<br>2. Immediately read balance | Data module correctly updates STORAGE-BALANCE | | | |

---

### 9. Business Rule Validation Tests

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|--------------|----------------------|----------------|------------|-----------------|---------------|--------|----------|
| TC-801 | Initial Balance Rule | Application fresh start | 1. Launch application<br>2. View balance | Initial balance is exactly $1,000.00 | | | Business rule: Start at $1,000 |
| TC-802 | No Negative Balance Rule | Account balance $100.00 | 1. Attempt debit of $200.00 | Transaction rejected, balance remains positive | | | Business rule: No overdrafts |
| TC-803 | Credit Has No Limit Rule | Account balance $1,000.00 | 1. Credit any large amount within system capacity | Credit is accepted without upper limit validation | | | Business rule: Unlimited deposits |
| TC-804 | Debit Requires Sufficient Funds Rule | Account balance $500.00 | 1. Attempt debit of $600.00 | Transaction rejected with error message | | | Business rule: Pre-transaction validation |
| TC-805 | Two Decimal Place Precision Rule | Any balance state | 1. Perform operations with decimal amounts | All balances maintain 2 decimal places | | | Business rule: Currency format |
| TC-806 | Balance Display Format | Any balance state | 1. View balance | Balance displays with proper currency formatting | | | Format: ####.## |

---

### 10. User Experience Tests

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|--------------|----------------------|----------------|------------|-----------------|---------------|--------|----------|
| TC-901 | Clear Error Messages | Application running | 1. Attempt invalid operation | Error message is clear and actionable | | | |
| TC-902 | Confirmation Messages | Complete successful transaction | 1. Credit or debit account | System provides confirmation with new balance | | | |
| TC-903 | Menu Readability | Application running | 1. View main menu | Menu options are clearly numbered and labeled | | | |
| TC-904 | Input Prompts | Any operation requiring input | 1. Select operation | System clearly prompts for required input | | | |
| TC-905 | Exit Confirmation | Application running | 1. Select exit option | System displays goodbye message before terminating | | | |

---

## Test Execution Notes

### Pre-requisites
- COBOL compiler (GnuCOBOL) installed
- Application compiled successfully
- Test environment matches production specifications

### Test Data Requirements
- Initial balance: $1,000.00
- Test amounts: $0.01, $50.00, $100.00, $250.00, $500.00, $999.99, $1,000.00, $5,000.00

### Testing Approach
1. Execute tests in order of dependency
2. Reset application state between test suites as needed
3. Document any deviations from expected results
4. Flag any business rule violations immediately

### Success Criteria
- All test cases pass (100%)
- No data integrity issues observed
- Business rules consistently enforced
- Error handling works as expected

---

## Migration to Node.js

This test plan will serve as the acceptance criteria for the Node.js implementation. All test cases must pass in the new implementation to ensure feature parity with the legacy COBOL system.

### Additional Considerations for Node.js Tests
- Unit tests for each business logic function
- Integration tests for API endpoints (if applicable)
- Database transaction tests
- Concurrency and race condition tests
- Input validation and sanitization tests
- Security tests (authentication, authorization)
- Performance benchmarks

---

**Document Version:** 1.0  
**Last Updated:** January 30, 2026  
**Status:** Ready for Stakeholder Review
