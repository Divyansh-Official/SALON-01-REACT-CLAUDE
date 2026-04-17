import React, { useState, useCallback } from 'react';
import type { SalonData, SelectedService, BookingFormState } from '../../types';
import Container from '../ui/Container';
import SectionLabel from '../ui/SectionLabel';
import SvgIcon from '../ui/SvgIcon';
import Button from '../ui/Button';
import Input from '../ui/Input';
import AnimatedReveal from '../ui/AnimatedReveal';
import { formatPrice, formatDuration, getMinBookingDate, getMaxBookingDate } from '../../utils/format';

interface BookingProps {
  salon: SalonData;
  preSelectedServices?: SelectedService[];
}

type Step = 'services' | 'datetime' | 'details' | 'confirm';

const STEPS: { id: Step; label: string; icon: string }[] = [
  { id: 'services', label: 'Services', icon: 'sparkles' },
  { id: 'datetime', label: 'Date & Time', icon: 'calendar' },
  { id: 'details', label: 'Your Details', icon: 'user' },
  { id: 'confirm', label: 'Confirm', icon: 'checkCircle' },
];

const Booking: React.FC<BookingProps> = ({ salon, preSelectedServices = [] }) => {
  const { booking, services, team } = salon;

  const [currentStep, setCurrentStep] = useState<Step>('services');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormState, string>>>({});

  const [form, setForm] = useState<BookingFormState>({
    date: '',
    timeSlot: '',
    selectedServices: preSelectedServices,
    stylistId: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    notes: '',
  });

  const allSubServices = services.flatMap((s) =>
    s.subServices.map((sub) => ({ ...sub, serviceId: s.id, categoryName: s.category }))
  );

  const isServiceSelected = (subId: string) =>
    form.selectedServices.some((s) => s.subServiceId === subId);

  const toggleService = useCallback(
    (subId: string, serviceId: string) => {
      const sub = allSubServices.find((s) => s.id === subId);
      if (!sub) return;
      setForm((prev) => {
        const already = prev.selectedServices.some((s) => s.subServiceId === subId);
        if (already) {
          return { ...prev, selectedServices: prev.selectedServices.filter((s) => s.subServiceId !== subId) };
        }
        return {
          ...prev,
          selectedServices: [
            ...prev.selectedServices,
            { serviceId, subServiceId: subId, name: sub.name, price: sub.price, duration: sub.duration },
          ],
        };
      });
    },
    [allSubServices]
  );

  const total = form.selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = form.selectedServices.reduce((sum, s) => sum + s.duration, 0);

  const validateStep = (): boolean => {
    const newErrors: typeof errors = {};
    if (currentStep === 'services' && form.selectedServices.length === 0) {
      newErrors.selectedServices = 'Please select at least one service.';
    }
    if (currentStep === 'datetime') {
      if (!form.date) newErrors.date = 'Please select a date.';
      if (!form.timeSlot) newErrors.timeSlot = 'Please select a time slot.';
    }
    if (currentStep === 'details') {
      if (!form.customerName.trim()) newErrors.customerName = 'Name is required.';
      if (!form.customerPhone.trim()) newErrors.customerPhone = 'Phone number is required.';
      if (!form.customerEmail.trim()) newErrors.customerEmail = 'Email is required.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail))
        newErrors.customerEmail = 'Enter a valid email address.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    const idx = STEPS.findIndex((s) => s.id === currentStep);
    if (idx < STEPS.length - 1) setCurrentStep(STEPS[idx + 1].id);
  };

  const prevStep = () => {
    const idx = STEPS.findIndex((s) => s.id === currentStep);
    if (idx > 0) setCurrentStep(STEPS[idx - 1].id);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500)); // simulate API
    setSubmitting(false);
    setSubmitted(true);
  };

  const stepIdx = STEPS.findIndex((s) => s.id === currentStep);

  if (submitted) {
    return (
      <section id="booking" className="py-24 md:py-32" style={{ background: 'var(--color-background)' }}>
        <Container narrow>
          <div
            className="flex flex-col items-center gap-6 py-16 px-8 text-center"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >
            <div
              className="w-16 h-16 flex items-center justify-center rounded-full"
              style={{ background: 'rgba(107,158,107,0.15)', color: 'var(--color-success)' }}
            >
              <SvgIcon name="checkCircle" size={36} />
            </div>
            <h2
              className="font-display text-4xl font-light"
              style={{ color: 'var(--color-textPrimary)' }}
            >
              Booking Requested
            </h2>
            <p className="text-sm font-light max-w-md" style={{ color: 'var(--color-textSecondary)' }}>
              {booking.confirmationNote}
            </p>
            <div
              className="w-full max-w-sm p-5 text-left mt-2"
              style={{ background: 'var(--color-surfaceAlt)', border: '1px solid var(--color-borderLight)' }}
            >
              <p className="text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--color-accentPrimary)' }}>
                Booking Summary
              </p>
              <p className="text-sm font-light mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                <span style={{ color: 'var(--color-textMuted)' }}>Name: </span>{form.customerName}
              </p>
              <p className="text-sm font-light mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                <span style={{ color: 'var(--color-textMuted)' }}>Date: </span>{form.date}
              </p>
              <p className="text-sm font-light mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                <span style={{ color: 'var(--color-textMuted)' }}>Time: </span>{form.timeSlot}
              </p>
              <p className="text-sm font-light" style={{ color: 'var(--color-textSecondary)' }}>
                <span style={{ color: 'var(--color-textMuted)' }}>Total: </span>
                <span style={{ color: 'var(--color-accentPrimary)' }}>{formatPrice(total)}</span>
              </p>
            </div>
            <Button variant="secondary" onClick={() => { setSubmitted(false); setForm({ date: '', timeSlot: '', selectedServices: [], stylistId: '', customerName: '', customerPhone: '', customerEmail: '', notes: '' }); setCurrentStep('services'); }}>
              New Booking
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      id="booking"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'var(--color-background)' }}
      aria-label="Book an appointment"
    >
      <div className="absolute top-0 left-0">
        <SectionLabel align="left">{booking.sectionLabel}</SectionLabel>
      </div>

      <Container className="pt-10">
        <AnimatedReveal direction="up">
          <div className="text-center mb-12">
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: 'var(--color-textPrimary)' }}>
              {booking.title}
            </h2>
            <p className="mt-4 text-sm tracking-[0.18em] uppercase" style={{ color: 'var(--color-textMuted)' }}>
              {booking.subtitle}
            </p>
          </div>
        </AnimatedReveal>

        {/* Step Progress */}
        <AnimatedReveal direction="up" delay={50}>
          <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
            {STEPS.map((step, i) => {
              const isDone = i < stepIdx;
              const isActive = step.id === currentStep;
              return (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center gap-1.5 min-w-0">
                    <div
                      className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 shrink-0"
                      style={{
                        background: isActive || isDone ? 'var(--color-accentPrimary)' : 'var(--color-surface)',
                        color: isActive || isDone ? 'var(--color-buttonPrimaryText)' : 'var(--color-textMuted)',
                        border: `1px solid ${isActive || isDone ? 'var(--color-accentPrimary)' : 'var(--color-border)'}`,
                      }}
                    >
                      {isDone ? (
                        <SvgIcon name="check" size={16} />
                      ) : (
                        <SvgIcon name={step.icon} size={15} />
                      )}
                    </div>
                    <span
                      className="text-[9px] tracking-[0.12em] uppercase font-medium whitespace-nowrap"
                      style={{ color: isActive ? 'var(--color-accentPrimary)' : 'var(--color-textMuted)' }}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className="h-px flex-1 mx-1 min-w-6 transition-colors duration-300"
                      style={{ background: i < stepIdx ? 'var(--color-accentPrimary)' : 'var(--color-border)' }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </AnimatedReveal>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Main Form Panel */}
          <div className="lg:col-span-2">
            <AnimatedReveal direction="up" delay={80}>
              <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                {/* Step: Select Services */}
                {currentStep === 'services' && (
                  <div className="p-6 md:p-8">
                    <h3 className="font-display text-2xl font-light mb-6" style={{ color: 'var(--color-textPrimary)' }}>
                      Choose Your Services
                    </h3>
                    {errors.selectedServices && (
                      <p className="text-xs mb-4" style={{ color: 'var(--color-error)' }}>{errors.selectedServices}</p>
                    )}
                    <div className="flex flex-col gap-6">
                      {services.map((service) => (
                        <div key={service.id}>
                          <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <SvgIcon name={service.icon} size={16} style={{ color: 'var(--color-accentPrimary)' }} />
                            <h4 className="text-xs tracking-[0.18em] uppercase font-medium" style={{ color: 'var(--color-accentSecondary)' }}>
                              {service.category}
                            </h4>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {service.subServices.map((sub) => {
                              const selected = isServiceSelected(sub.id);
                              return (
                                <button
                                  key={sub.id}
                                  onClick={() => toggleService(sub.id, service.id)}
                                  className="flex items-start gap-3 p-4 text-left transition-all duration-200"
                                  style={{
                                    background: selected ? 'rgba(184,150,90,0.08)' : 'var(--color-surfaceAlt)',
                                    border: `1px solid ${selected ? 'var(--color-accentPrimary)' : 'var(--color-border)'}`,
                                  }}
                                  aria-pressed={selected}
                                  aria-label={`${selected ? 'Deselect' : 'Select'} ${sub.name}`}
                                >
                                  <div
                                    className="w-5 h-5 flex items-center justify-center rounded shrink-0 mt-0.5 transition-all duration-200"
                                    style={{
                                      background: selected ? 'var(--color-accentPrimary)' : 'transparent',
                                      border: `1.5px solid ${selected ? 'var(--color-accentPrimary)' : 'var(--color-borderLight)'}`,
                                      color: 'var(--color-buttonPrimaryText)',
                                    }}
                                  >
                                    {selected && <SvgIcon name="check" size={11} />}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium leading-snug" style={{ color: 'var(--color-textPrimary)' }}>
                                      {sub.name}
                                    </p>
                                    <p className="text-[10px] font-light mt-0.5 leading-relaxed" style={{ color: 'var(--color-textMuted)' }}>
                                      {formatDuration(sub.duration)}
                                    </p>
                                  </div>
                                  <div className="shrink-0 text-right">
                                    {sub.originalPrice && (
                                      <p className="text-[10px] line-through" style={{ color: 'var(--color-textMuted)' }}>
                                        {formatPrice(sub.originalPrice)}
                                      </p>
                                    )}
                                    <p className="font-display text-base font-semibold" style={{ color: 'var(--color-accentPrimary)' }}>
                                      {formatPrice(sub.price)}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step: Date & Time */}
                {currentStep === 'datetime' && (
                  <div className="p-6 md:p-8">
                    <h3 className="font-display text-2xl font-light mb-6" style={{ color: 'var(--color-textPrimary)' }}>
                      Choose Date & Time
                    </h3>
                    <div className="flex flex-col gap-6">
                      <Input
                        label="Preferred Date"
                        type="date"
                        value={form.date}
                        min={getMinBookingDate()}
                        max={getMaxBookingDate()}
                        onChange={(e) => setForm((p) => ({ ...p, date: (e.target as HTMLInputElement).value }))}
                        error={errors.date}
                      />
                      <div>
                        <label className="text-xs tracking-[0.15em] uppercase font-medium block mb-2" style={{ color: 'var(--color-textSecondary)' }}>
                          Available Time Slots
                        </label>
                        {errors.timeSlot && (
                          <p className="text-xs mb-2" style={{ color: 'var(--color-error)' }}>{errors.timeSlot}</p>
                        )}
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {booking.timeSlots.map((slot) => {
                            const selected = form.timeSlot === slot;
                            return (
                              <button
                                key={slot}
                                onClick={() => setForm((p) => ({ ...p, timeSlot: slot }))}
                                className="py-2.5 text-xs tracking-wide transition-all duration-150"
                                style={{
                                  background: selected ? 'var(--color-accentPrimary)' : 'var(--color-surfaceAlt)',
                                  color: selected ? 'var(--color-buttonPrimaryText)' : 'var(--color-textSecondary)',
                                  border: `1px solid ${selected ? 'var(--color-accentPrimary)' : 'var(--color-border)'}`,
                                }}
                                aria-pressed={selected}
                                aria-label={`Select ${slot}`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      {/* Stylist selection */}
                      <div>
                        <label className="text-xs tracking-[0.15em] uppercase font-medium block mb-2" style={{ color: 'var(--color-textSecondary)' }}>
                          Preferred Stylist (Optional)
                        </label>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {[{ id: '', name: 'No Preference', title: 'Any available specialist', image: '' }, ...team].map((member) => {
                            const selected = form.stylistId === member.id;
                            return (
                              <button
                                key={member.id}
                                onClick={() => setForm((p) => ({ ...p, stylistId: member.id }))}
                                className="flex items-center gap-3 p-3 text-left transition-all duration-150"
                                style={{
                                  background: selected ? 'rgba(184,150,90,0.08)' : 'var(--color-surfaceAlt)',
                                  border: `1px solid ${selected ? 'var(--color-accentPrimary)' : 'var(--color-border)'}`,
                                }}
                                aria-pressed={selected}
                              >
                                {member.image ? (
                                  <img src={member.image} alt={member.name} className="w-9 h-9 rounded-full object-cover shrink-0" loading="lazy" />
                                ) : (
                                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--color-surface)', color: 'var(--color-accentPrimary)', border: '1px solid var(--color-border)' }}>
                                    <SvgIcon name="user" size={16} />
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <p className="text-xs font-medium truncate" style={{ color: 'var(--color-textPrimary)' }}>{member.name}</p>
                                  <p className="text-[10px] font-light truncate" style={{ color: 'var(--color-textMuted)' }}>{member.title}</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step: Details */}
                {currentStep === 'details' && (
                  <div className="p-6 md:p-8">
                    <h3 className="font-display text-2xl font-light mb-6" style={{ color: 'var(--color-textPrimary)' }}>
                      Your Details
                    </h3>
                    <div className="flex flex-col gap-4">
                      <Input
                        label="Full Name"
                        type="text"
                        placeholder="Your full name"
                        value={form.customerName}
                        onChange={(e) => setForm((p) => ({ ...p, customerName: (e.target as HTMLInputElement).value }))}
                        error={errors.customerName}
                      />
                      <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="+1 (000) 000-0000"
                        value={form.customerPhone}
                        onChange={(e) => setForm((p) => ({ ...p, customerPhone: (e.target as HTMLInputElement).value }))}
                        error={errors.customerPhone}
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="your@email.com"
                        value={form.customerEmail}
                        onChange={(e) => setForm((p) => ({ ...p, customerEmail: (e.target as HTMLInputElement).value }))}
                        error={errors.customerEmail}
                      />
                      <Input
                        label="Special Requests or Notes (Optional)"
                        multiline
                        rows={3}
                        placeholder="Any allergies, preferences, or notes for your stylist..."
                        value={form.notes}
                        onChange={(e) => setForm((p) => ({ ...p, notes: (e.target as HTMLTextAreaElement).value }))}
                      />
                    </div>
                  </div>
                )}

                {/* Step: Confirm */}
                {currentStep === 'confirm' && (
                  <div className="p-6 md:p-8">
                    <h3 className="font-display text-2xl font-light mb-6" style={{ color: 'var(--color-textPrimary)' }}>
                      Confirm Booking
                    </h3>
                    {/* Summary rows */}
                    <div className="flex flex-col gap-3 mb-6">
                      {[
                        { icon: 'user', label: 'Name', value: form.customerName },
                        { icon: 'phone', label: 'Phone', value: form.customerPhone },
                        { icon: 'mail', label: 'Email', value: form.customerEmail },
                        { icon: 'calendar', label: 'Date', value: form.date },
                        { icon: 'clock', label: 'Time', value: form.timeSlot },
                        { icon: 'user', label: 'Stylist', value: form.stylistId ? team.find(t => t.id === form.stylistId)?.name || 'No preference' : 'No preference' },
                      ].map((row) => (
                        <div key={row.label} className="flex items-center gap-3 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                          <SvgIcon name={row.icon} size={14} style={{ color: 'var(--color-accentPrimary)', flexShrink: 0 }} />
                          <span className="text-xs uppercase tracking-wide w-16 font-medium shrink-0" style={{ color: 'var(--color-textMuted)' }}>{row.label}</span>
                          <span className="text-sm font-light" style={{ color: 'var(--color-textSecondary)' }}>{row.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Policies */}
                    <div className="flex flex-col gap-2 p-4 mb-4" style={{ background: 'var(--color-surfaceAlt)', border: '1px solid var(--color-borderLight)' }}>
                      {[booking.depositPolicy, booking.cancellationPolicy].map((policy, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <SvgIcon name="info" size={13} style={{ color: 'var(--color-textMuted)', flexShrink: 0, marginTop: 1 }} />
                          <p className="text-[11px] font-light leading-relaxed" style={{ color: 'var(--color-textMuted)' }}>{policy}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="flex items-center justify-between px-6 pb-6 md:px-8 gap-3 pt-2" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <Button variant="ghost" size="sm" onClick={prevStep} className={stepIdx === 0 ? 'invisible' : ''}>
                    <SvgIcon name="arrowLeft" size={14} />
                    Back
                  </Button>
                  {currentStep !== 'confirm' ? (
                    <Button variant="primary" size="md" onClick={nextStep}>
                      Continue
                      <SvgIcon name="arrowRight" size={14} />
                    </Button>
                  ) : (
                    <Button variant="primary" size="md" onClick={handleSubmit} disabled={submitting}>
                      {submitting ? 'Submitting...' : 'Confirm Booking'}
                      {!submitting && <SvgIcon name="checkCircle" size={14} />}
                    </Button>
                  )}
                </div>
              </div>
            </AnimatedReveal>
          </div>

          {/* Sidebar Summary */}
          <AnimatedReveal direction="left" delay={100} className="lg:sticky lg:top-24">
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <div className="p-5 pb-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <p className="text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: 'var(--color-accentPrimary)' }}>
                  Appointment Summary
                </p>
              </div>
              <div className="p-5">
                {form.selectedServices.length === 0 ? (
                  <p className="text-xs font-light text-center py-4" style={{ color: 'var(--color-textMuted)' }}>
                    No services selected yet
                  </p>
                ) : (
                  <>
                    <div className="flex flex-col gap-3 mb-4">
                      {form.selectedServices.map((s) => (
                        <div key={s.subServiceId} className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2">
                            <button
                              onClick={() => toggleService(s.subServiceId, s.serviceId)}
                              className="mt-0.5 shrink-0 w-4 h-4 flex items-center justify-center transition-colors"
                              style={{ color: 'var(--color-textMuted)' }}
                              aria-label={`Remove ${s.name}`}
                            >
                              <SvgIcon name="minus" size={12} />
                            </button>
                            <div>
                              <p className="text-xs font-medium" style={{ color: 'var(--color-textSecondary)' }}>{s.name}</p>
                              <p className="text-[10px]" style={{ color: 'var(--color-textMuted)' }}>{formatDuration(s.duration)}</p>
                            </div>
                          </div>
                          <p className="text-sm font-display font-semibold shrink-0" style={{ color: 'var(--color-accentPrimary)' }}>
                            {formatPrice(s.price)}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="pt-3 flex flex-col gap-1.5" style={{ borderTop: '1px solid var(--color-border)' }}>
                      <div className="flex justify-between text-xs" style={{ color: 'var(--color-textMuted)' }}>
                        <span>Total Duration</span>
                        <span>{formatDuration(totalDuration)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs uppercase tracking-wide font-medium" style={{ color: 'var(--color-textSecondary)' }}>Total</span>
                        <span className="font-display text-xl font-semibold" style={{ color: 'var(--color-accentPrimary)' }}>{formatPrice(total)}</span>
                      </div>
                      <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--color-textMuted)' }}>
                        <span>Deposit (25%)</span>
                        <span>{formatPrice(Math.ceil(total * 0.25))}</span>
                      </div>
                    </div>
                  </>
                )}
                {form.date && (
                  <div className="mt-4 pt-4 flex flex-col gap-1" style={{ borderTop: '1px solid var(--color-border)' }}>
                    {form.date && (
                      <p className="text-xs" style={{ color: 'var(--color-textSecondary)' }}>
                        <span style={{ color: 'var(--color-textMuted)' }}>Date: </span>{form.date}
                      </p>
                    )}
                    {form.timeSlot && (
                      <p className="text-xs" style={{ color: 'var(--color-textSecondary)' }}>
                        <span style={{ color: 'var(--color-textMuted)' }}>Time: </span>{form.timeSlot}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Policy note */}
            <div
              className="mt-4 p-4 flex items-start gap-2"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              <SvgIcon name="shield" size={14} style={{ color: 'var(--color-accentPrimary)', flexShrink: 0, marginTop: 1 }} />
              <p className="text-[11px] font-light leading-relaxed" style={{ color: 'var(--color-textMuted)' }}>
                {booking.depositPolicy}
              </p>
            </div>
          </AnimatedReveal>
        </div>
      </Container>
    </section>
  );
};

export default Booking;
