'use client';

import { useState } from 'react';

import { SITE, whatsappLink } from '@/lib/site';
import { ArrowIcon, WhatsAppIcon } from '@/components/ui/icons';

const SERVICES = ['Wall cladding', 'Flooring', 'Countertops & vanities', 'Ventilated facade', 'Staircases', 'Mosaic & decorative', 'Supply only', 'Other'];
const TYPES = ['Villa / residence', 'High-rise', 'Commercial', 'Hospitality', 'Public'];

/**
 * The site is static, so the enquiry is composed here and handed to WhatsApp
 * or the visitor's mail app — nothing is stored or sent to a third party.
 */
export function QuoteForm() {
  const [error, setError] = useState('');

  const compose = (form: HTMLFormElement) => {
    const d = new FormData(form);
    const name = String(d.get('name') ?? '').trim();
    const phone = String(d.get('phone') ?? '').trim();
    const details = String(d.get('details') ?? '').trim();
    if (!name || !details || !phone) {
      setError('Please add your name, phone and a few project details.');
      return null;
    }
    setError('');
    return [
      'New enquiry — royalmarble.ae',
      `Name: ${name}`,
      d.get('company') ? `Company: ${d.get('company')}` : '',
      `Phone: ${phone}`,
      d.get('email') ? `Email: ${d.get('email')}` : '',
      d.get('service') ? `Service: ${d.get('service')}` : '',
      d.get('type') ? `Project type: ${d.get('type')}` : '',
      `Details: ${details}`,
    ].filter(Boolean).join('\n');
  };

  const field = 'w-full rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-paper)] px-4 py-3.5 text-[0.95rem] outline-none transition-colors focus:border-[var(--color-ink)]';

  return (
    <form
      className="grid gap-4"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const text = compose(e.currentTarget);
        if (text) window.open(whatsappLink(text), '_blank', 'noopener');
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium">Full name *<input name="name" required autoComplete="name" className={field} /></label>
        <label className="grid gap-1.5 text-sm font-medium">Company<input name="company" autoComplete="organization" className={field} /></label>
        <label className="grid gap-1.5 text-sm font-medium">Phone / WhatsApp *<input name="phone" type="tel" required autoComplete="tel" className={field} /></label>
        <label className="grid gap-1.5 text-sm font-medium">Email<input name="email" type="email" autoComplete="email" className={field} /></label>
        <label className="grid gap-1.5 text-sm font-medium">Service
          <select name="service" className={field} defaultValue=""><option value="">Select…</option>{SERVICES.map((s) => <option key={s}>{s}</option>)}</select>
        </label>
        <label className="grid gap-1.5 text-sm font-medium">Project type
          <select name="type" className={field} defaultValue=""><option value="">Select…</option>{TYPES.map((s) => <option key={s}>{s}</option>)}</select>
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-medium">Project details *
        <textarea name="details" required rows={5} placeholder="Materials, areas or quantities, location, timeline…" className={field} />
      </label>
      {error ? <p role="alert" className="text-sm text-[#9b2c1d]">{error}</p> : null}
      <div className="flex flex-wrap gap-3 pt-2">
        <button type="submit" className="btn btn-dark">
          <WhatsAppIcon /> Send via WhatsApp <span className="btn-dot"><ArrowIcon /></span>
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={(e) => {
            const text = compose(e.currentTarget.form!);
            if (text) window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Project enquiry')}&body=${encodeURIComponent(text)}`;
          }}
        >
          Send by email <span className="btn-dot"><ArrowIcon /></span>
        </button>
      </div>
      <p className="text-xs text-[var(--color-ink-3)]">Your message opens in WhatsApp or your email app — we don&rsquo;t store anything on this website.</p>
    </form>
  );
}
