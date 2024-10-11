"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { onrampTnxn } from "../app/lib/actions/onramptransaction";
import { useRouter } from 'next/navigation';

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const router = useRouter();

    const handleAddMoney = async () => {
        try {
            await onrampTnxn(amount, provider);
            // Redirect to the bank's page
            window.location.href = redirectUrl || "";
            
            // Set up a listener for when the user returns from the bank's page
            window.addEventListener('focus', () => {
                // Refresh the page to fetch the latest balance
                router.refresh();
            }, { once: true });
        } catch (error) {
            console.error("Error adding money:", error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    return (
        <Card title="Add Money">
            <div className="w-full">
                <TextInput 
                    label={"Amount"} 
                    placeholder={"Amount"} 
                    onChange={(value) => setAmount(Number(value))} 
                />
                <div className="py-4 text-left">
                    Bank
                </div>
                <Select 
                    onSelect={(value) => {
                        const selectedBank = SUPPORTED_BANKS.find(x => x.name === value);
                        setRedirectUrl(selectedBank?.redirectUrl || "");
                        setProvider(selectedBank?.name || "");
                    }} 
                    options={SUPPORTED_BANKS.map(x => ({
                        key: x.name,
                        value: x.name
                    }))} 
                />
                <div className="flex justify-center pt-4">
                    <Button onClick={handleAddMoney}>
                        Add Money
                    </Button>
                </div>
            </div>
        </Card>
    );
}