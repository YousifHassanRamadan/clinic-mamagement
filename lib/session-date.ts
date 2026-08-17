export function combineDateAndTime(date: string, time: string) {
  const value = new Date(`${date}T${time}:00`);

  if (Number.isNaN(value.getTime())) {
    throw new Error("Invalid session date or time");
  }

  return value;
}
