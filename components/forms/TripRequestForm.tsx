"use client";

import { type FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { useTranslation } from "@/components/LanguageProvider";

type TripValues = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  arrivalDate: string;
  departureDate: string;
  travelers: string;
  preferredDestinations: string;
  travelStyle: string;
  budgetRange: string;
  accommodation: string;
  specialRequests: string;
};

const initialValues: TripValues = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  arrivalDate: "",
  departureDate: "",
  travelers: "",
  preferredDestinations: "",
  travelStyle: "",
  budgetRange: "",
  accommodation: "",
  specialRequests: "",
};

export function TripRequestForm() {
  const { dictionary, language } = useTranslation();
  const [values, setValues] = useState<TripValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof TripValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (field: keyof TripValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof TripValues, string>> = {};
    const requiredFields: Array<keyof TripValues> = [
      "fullName",
      "email",
      "country",
      "arrivalDate",
      "departureDate",
      "travelers",
      "preferredDestinations",
      "travelStyle",
      "budgetRange",
    ];
    requiredFields.forEach((field) => {
      if (!String(values[field]).trim()) {
        nextErrors[field] = dictionary.forms.errors.required;
      }
    });
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) {
      nextErrors.email = dictionary.forms.errors.email;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const response = await fetch("/api/trip-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, language }),
      });

      if (!response.ok) {
        throw new Error("Trip request submission failed");
      }

      setSubmitting(false);
      setSubmitted(true);
      setSubmitError("");
      setValues(initialValues);
    } catch {
      setSubmitting(false);
      setSubmitted(false);
      setSubmitError(dictionary.forms.serverError);
    }
  };

  return (
    <form onSubmit={submit} className="form-shell border border-[var(--line)] bg-[var(--paper)] p-5 md:p-7" noValidate>
      {submitted ? (
        <div role="status" className="mb-6 bg-[var(--forest)] p-4 text-sm leading-6 text-white">
          {dictionary.forms.successTrip}
        </div>
      ) : null}
      {submitError ? (
        <div role="alert" className="mb-6 border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">
          {submitError}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <TextField label={dictionary.forms.fullName} id="fullName" value={values.fullName} error={errors.fullName} onChange={(value) => update("fullName", value)} />
        <TextField label={dictionary.forms.email} id="email" value={values.email} error={errors.email} onChange={(value) => update("email", value)} type="email" />
        <TextField label={dictionary.forms.phone} id="phone" value={values.phone} error={errors.phone} onChange={(value) => update("phone", value)} type="tel" />
        <TextField label={dictionary.forms.country} id="country" value={values.country} error={errors.country} onChange={(value) => update("country", value)} />
        <TextField label={dictionary.forms.arrivalDate} id="arrivalDate" value={values.arrivalDate} error={errors.arrivalDate} onChange={(value) => update("arrivalDate", value)} type="date" />
        <TextField label={dictionary.forms.departureDate} id="departureDate" value={values.departureDate} error={errors.departureDate} onChange={(value) => update("departureDate", value)} type="date" />
        <TextField label={dictionary.forms.travelers} id="tripTravelers" value={values.travelers} error={errors.travelers} onChange={(value) => update("travelers", value)} type="number" min="1" />
        <TextField label={dictionary.forms.budgetRange} id="budgetRange" value={values.budgetRange} error={errors.budgetRange} onChange={(value) => update("budgetRange", value)} placeholder="€600 - €1200" />

        <div className="md:col-span-2">
          <TextField label={dictionary.forms.preferredDestinations} id="preferredDestinations" value={values.preferredDestinations} error={errors.preferredDestinations} onChange={(value) => update("preferredDestinations", value)} placeholder="Skopje, Ohrid, Mavrovo" />
        </div>

        <SelectField label={dictionary.forms.travelStyle} id="travelStyle" value={values.travelStyle} error={errors.travelStyle} onChange={(value) => update("travelStyle", value)} options={["Slow cultural", "Nature and hiking", "Food and wine", "Family-friendly", "Premium comfort"]} />
        <SelectField label={dictionary.forms.accommodation} id="accommodation" value={values.accommodation} error={errors.accommodation} onChange={(value) => update("accommodation", value)} options={["Boutique hotel", "Apartment", "Luxury hotel", "Mountain lodge", "Not needed"]} />

        <div className="md:col-span-2">
          <label htmlFor="specialRequests" className="mb-2 block fine-label text-[var(--forest)]">
            {dictionary.forms.specialRequests}
          </label>
          <textarea id="specialRequests" rows={5} value={values.specialRequests} onChange={(event) => update("specialRequests", event.target.value)} className="field-input resize-y" />
        </div>
      </div>

      <button type="submit" disabled={submitting} className="submit-button mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 border border-[var(--forest)] bg-[var(--forest)] px-6 text-xs font-extrabold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--forest-deep)] disabled:opacity-60">
        {submitting ? dictionary.common.submitting : dictionary.common.submitRequest}
        <Send size={17} aria-hidden="true" />
      </button>
    </form>
  );
}

function TextField({
  label,
  id,
  value,
  error,
  onChange,
  type = "text",
  min,
  placeholder,
}: {
  label: string;
  id: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  min?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block fine-label text-[var(--forest)]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        min={min}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="field-input"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  label,
  id,
  value,
  error,
  onChange,
  options,
}: {
  label: string;
  id: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  const { dictionary } = useTranslation();

  return (
    <div>
      <label htmlFor={id} className="mb-2 block fine-label text-[var(--forest)]">
        {label}
      </label>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value)} className="field-input" aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined}>
        <option value="">{dictionary.forms.selectOption}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
