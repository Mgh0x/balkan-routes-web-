"use client";

import { type FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { tours } from "@/data/tours";
import { useTranslation } from "@/components/LanguageProvider";
import { text } from "@/lib/localize";

type ContactValues = {
  name: string;
  email: string;
  phone: string;
  country: string;
  travelDates: string;
  travelers: string;
  interestedTour: string;
  message: string;
  consent: boolean;
};

const initialValues: ContactValues = {
  name: "",
  email: "",
  phone: "",
  country: "",
  travelDates: "",
  travelers: "",
  interestedTour: "",
  message: "",
  consent: false,
};

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const { dictionary, language } = useTranslation();
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (field: keyof ContactValues, value: string | boolean) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof ContactValues, string>> = {};
    const requiredFields: Array<keyof ContactValues> = ["name", "email", "country", "travelDates", "travelers", "message"];
    requiredFields.forEach((field) => {
      if (!String(values[field]).trim()) {
        nextErrors[field] = dictionary.forms.errors.required;
      }
    });
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) {
      nextErrors.email = dictionary.forms.errors.email;
    }
    if (!values.consent) {
      nextErrors.consent = dictionary.forms.errors.consent;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, language }),
      });

      if (!response.ok) {
        throw new Error("Contact submission failed");
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
          {dictionary.forms.successContact}
        </div>
      ) : null}
      {submitError ? (
        <div role="alert" className="mb-6 border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">
          {submitError}
        </div>
      ) : null}

      <div className={compact ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}>
        <Field label={dictionary.forms.name} id="name" error={errors.name}>
          <input id="name" value={values.name} onChange={(event) => update("name", event.target.value)} className="field-input" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
        </Field>
        <Field label={dictionary.forms.email} id="email" error={errors.email}>
          <input id="email" type="email" value={values.email} onChange={(event) => update("email", event.target.value)} className="field-input" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
        </Field>
        <Field label={dictionary.forms.phone} id="phone" error={errors.phone}>
          <input id="phone" type="tel" value={values.phone} onChange={(event) => update("phone", event.target.value)} className="field-input" />
        </Field>
        <Field label={dictionary.forms.country} id="country" error={errors.country}>
          <input id="country" value={values.country} onChange={(event) => update("country", event.target.value)} className="field-input" aria-invalid={Boolean(errors.country)} aria-describedby={errors.country ? "country-error" : undefined} />
        </Field>
        <Field label={dictionary.forms.travelDates} id="travelDates" error={errors.travelDates}>
          <input id="travelDates" value={values.travelDates} onChange={(event) => update("travelDates", event.target.value)} className="field-input" placeholder="12-15 June" aria-invalid={Boolean(errors.travelDates)} aria-describedby={errors.travelDates ? "travelDates-error" : undefined} />
        </Field>
        <Field label={dictionary.forms.travelers} id="travelers" error={errors.travelers}>
          <input id="travelers" type="number" min="1" value={values.travelers} onChange={(event) => update("travelers", event.target.value)} className="field-input" aria-invalid={Boolean(errors.travelers)} aria-describedby={errors.travelers ? "travelers-error" : undefined} />
        </Field>
        <Field label={dictionary.forms.interestedTour} id="interestedTour" error={errors.interestedTour}>
          <select id="interestedTour" value={values.interestedTour} onChange={(event) => update("interestedTour", event.target.value)} className="field-input">
            <option value="">{dictionary.forms.chooseTour}</option>
            {tours.map((tour) => (
              <option key={tour.slug} value={tour.slug}>
                {text(tour.title, language)}
              </option>
            ))}
          </select>
        </Field>
        <div className={compact ? "" : "md:col-span-2"}>
          <Field label={dictionary.forms.message} id="message" error={errors.message}>
            <textarea id="message" value={values.message} onChange={(event) => update("message", event.target.value)} rows={5} className="field-input resize-y" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
          </Field>
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-[var(--muted)]">
        <input type="checkbox" checked={values.consent} onChange={(event) => update("consent", event.target.checked)} className="mt-1 h-5 w-5 accent-[var(--forest)]" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} />
        <span>{dictionary.forms.consent}</span>
      </label>
      {errors.consent ? (
        <p id="consent-error" className="mt-2 text-sm text-red-700">
          {errors.consent}
        </p>
      ) : null}

      <button type="submit" disabled={submitting} className="submit-button mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 border border-[var(--forest)] bg-[var(--forest)] px-6 text-xs font-extrabold uppercase tracking-[0.18em] text-white transition hover:bg-[var(--forest-deep)] disabled:opacity-60">
        {submitting ? dictionary.common.submitting : dictionary.common.send}
        <Send size={17} aria-hidden="true" />
      </button>
    </form>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block fine-label text-[var(--forest)]">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
