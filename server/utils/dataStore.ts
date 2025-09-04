import fs from "fs";
import path from "path";

// Data directory
const DATA_DIR = path.join(process.cwd(), "data");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// File paths
const USERS_FILE = path.join(DATA_DIR, "users.json");
const EXPENSES_FILE = path.join(DATA_DIR, "expenses.json");
const BUDGETS_FILE = path.join(DATA_DIR, "budgets.json");

// Interfaces
export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  userId: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

export interface Budget {
  id: string;
  userId: string;
  category: string;
  limit: number;
  spent: number;
  period: "monthly" | "weekly" | "yearly";
  createdAt: string;
}

// Helper functions
function readJsonFile<T>(filePath: string, defaultValue: T[]): T[] {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      return JSON.parse(data);
    }
    return defaultValue;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return defaultValue;
  }
}

function writeJsonFile<T>(filePath: string, data: T[]): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
  }
}

// User operations
export function getUsers(): User[] {
  return readJsonFile<User>(USERS_FILE, []);
}

export function saveUser(user: User): void {
  const users = getUsers();
  users.push(user);
  writeJsonFile(USERS_FILE, users);
}

export function findUserByEmail(email: string): User | null {
  const users = getUsers();
  return users.find(user => user.email === email) || null;
}

export function findUserById(id: string): User | null {
  const users = getUsers();
  return users.find(user => user.id === id) || null;
}

// Expense operations
export function getExpenses(): Expense[] {
  return readJsonFile<Expense>(EXPENSES_FILE, []);
}

export function getUserExpenses(userId: string): Expense[] {
  const expenses = getExpenses();
  return expenses.filter(expense => expense.userId === userId);
}

export function saveExpense(expense: Expense): void {
  const expenses = getExpenses();
  expenses.push(expense);
  writeJsonFile(EXPENSES_FILE, expenses);
}

export function updateExpense(expenseId: string, updates: Partial<Expense>): void {
  const expenses = getExpenses();
  const index = expenses.findIndex(expense => expense.id === expenseId);
  if (index !== -1) {
    expenses[index] = { ...expenses[index], ...updates };
    writeJsonFile(EXPENSES_FILE, expenses);
  }
}

export function deleteExpense(expenseId: string): void {
  const expenses = getExpenses();
  const filtered = expenses.filter(expense => expense.id !== expenseId);
  writeJsonFile(EXPENSES_FILE, filtered);
}

// Budget operations
export function getBudgets(): Budget[] {
  return readJsonFile<Budget>(BUDGETS_FILE, []);
}

export function getUserBudgets(userId: string): Budget[] {
  const budgets = getBudgets();
  return budgets.filter(budget => budget.userId === userId);
}

export function saveBudget(budget: Budget): void {
  const budgets = getBudgets();
  budgets.push(budget);
  writeJsonFile(BUDGETS_FILE, budgets);
}

export function updateBudget(budgetId: string, updates: Partial<Budget>): void {
  const budgets = getBudgets();
  const index = budgets.findIndex(budget => budget.id === budgetId);
  if (index !== -1) {
    budgets[index] = { ...budgets[index], ...updates };
    writeJsonFile(BUDGETS_FILE, budgets);
  }
}

export function deleteBudget(budgetId: string): void {
  const budgets = getBudgets();
  const filtered = budgets.filter(budget => budget.id !== budgetId);
  writeJsonFile(BUDGETS_FILE, filtered);
}