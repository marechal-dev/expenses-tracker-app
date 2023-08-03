import { axiosClient } from "../lib/axios";

export async function storeExpense(expenseData) {
  const response = await axiosClient.post("/expenses.json", expenseData);
  const firebaseId = response.data.name;
  return firebaseId;
}

export async function fetchExpenses() {
  const response = await axiosClient.get("/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    expenses.push({
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    });
  }

  return expenses;
}

export function updateExpense(id, expenseData) {
  return axiosClient.put(`/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axiosClient.delete(`/expenses/${id}.json`);
}
