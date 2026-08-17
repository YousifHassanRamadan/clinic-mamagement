"use client";

import { Check, ChevronDown, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Doctor } from "./types";

interface DoctorSelectorProps {
  doctor: Doctor;
  doctors: Doctor[];
  onChange: (doctor: Doctor) => void;
}

const DoctorSelector = ({ doctor, doctors, onChange }: DoctorSelectorProps) => {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-sm font-semibold">2. Doctor</h2>

        <p className="mt-1 text-xs text-muted-foreground">
          Select the doctor whose availability you want to manage.
        </p>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-auto w-full justify-between rounded-xl px-3 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {doctor.initials}
              </div>

              <div className="text-left">
                <p className="text-sm font-medium">{doctor.name}</p>

                <p className="text-xs text-muted-foreground">{doctor.role}</p>
              </div>
            </div>

            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[--radix-popover-trigger-width] p-2">
          {doctors.map((item) => {
            const selected = item.id === doctor.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange(item)}
                className="flex w-full items-center justify-between rounded-lg p-2 text-left hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {item.initials}
                  </div>

                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </div>

                {selected && <Check className="h-4 w-4 text-primary" />}
              </button>
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DoctorSelector;
