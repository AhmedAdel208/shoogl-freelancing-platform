"use client";

import { useState } from "react";
import RegisterForm from "./RegisterForm";
import AccountType from "./AccountType";

export default function SignupFlow() {
  const [selectedAccountType, setSelectedAccountType] = useState<string | null>(
    null
  );

  const handleAccountTypeSelect = (typeId: string) => {
    setSelectedAccountType(typeId);
  };

  return (
    <main className="grow">
      {!selectedAccountType ? (
        <AccountType onSelectType={handleAccountTypeSelect} />
      ) : (
        <RegisterForm initialAccountType={selectedAccountType} />
      )}
    </main>
  );
}
