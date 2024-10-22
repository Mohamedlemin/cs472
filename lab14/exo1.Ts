interface Person {
    name: string;
    age: number;
    isStudent: boolean;
  }
  
  function describePerson(person: Person): string {
    const studentStatus = person.isStudent ? "a student" : "not a student";
    return `${person.name} is ${person.age} years old and is ${studentStatus}.`;
  }
  
  const person: Person = { name: "Alice", age: 25, isStudent: true };
  console.log(describePerson(person)); 