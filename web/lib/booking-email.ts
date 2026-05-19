import {
  customerEmailSalutation,
  customerEmailTitle,
  displayContactSummary,
} from "@/lib/booking";

export type SessionRequestDetails = {
  sessionType: string;
  townArea: string;
  shootSpotIdeas: string;
  scheduleNotes: string;
  customDetails: string;
  headcountLabel: string;
  fullName: string;
  firstName: string;
  email: string;
  phone: string;
  instagram: string;
  heardFrom: string;
  photoSharingLabel: string;
  notes: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function detailRows(
  details: SessionRequestDetails,
  options?: { highlightPhone?: boolean },
): { label: string; value: string; href?: string; highlight?: boolean }[] {
  const rows: { label: string; value: string; href?: string; highlight?: boolean }[] = [
    { label: "Session", value: details.sessionType },
    { label: "Town or area", value: details.townArea },
  ];
  if (details.customDetails) {
    rows.push({ label: "Custom shoot", value: details.customDetails });
  }
  if (details.headcountLabel) {
    rows.push({ label: "People", value: details.headcountLabel });
  }
  if (details.shootSpotIdeas) {
    rows.push({ label: "Location ideas", value: details.shootSpotIdeas });
  }
  rows.push({ label: "When / availability", value: details.scheduleNotes });

  if (details.fullName) {
    rows.push({ label: "Name", value: details.fullName });
  }
  rows.push({ label: "Email", value: details.email, href: `mailto:${details.email}` });
  if (details.phone) {
    rows.push({
      label: "Phone",
      value: details.phone,
      href: `tel:${details.phone.replace(/\s/g, "")}`,
      highlight: options?.highlightPhone,
    });
  }
  if (details.instagram) {
    const handle = details.instagram.replace(/^@/, "");
    rows.push({
      label: "Instagram",
      value: `@${handle}`,
      href: `https://instagram.com/${encodeURIComponent(handle)}`,
    });
  }
  if (details.heardFrom) {
    rows.push({ label: "Heard about us", value: details.heardFrom });
  }
  rows.push({ label: "Photo sharing", value: details.photoSharingLabel });
  if (details.notes) {
    rows.push({ label: "Other notes", value: details.notes });
  }
  return rows;
}

function rowsToPlainText(rows: { label: string; value: string }[]): string[] {
  return rows.map((r) => `${r.label}: ${r.value}`);
}

function renderRowsTable(
  rows: { label: string; value: string; href?: string; highlight?: boolean }[],
): string {
  const accent = "#5a1c1c";
  const muted = "#5c5c5c";
  const border = "#ebe6e2";

  return rows
    .map((row) => {
      const valueHtml = row.href
        ? `<a href="${escapeHtml(row.href)}" style="color:${accent};text-decoration:none;font-weight:600;">${escapeHtml(row.value)}</a>`
        : escapeHtml(row.value).replace(/\n/g, "<br />");
      const valueStyle = row.highlight
        ? `font-size:15px;font-weight:600;color:${accent};`
        : `font-size:14px;line-height:1.5;color:#1a1a1a;`;

      return `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid ${border};vertical-align:top;width:38%;">
            <span style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${muted};">${escapeHtml(row.label)}</span>
          </td>
          <td style="padding:14px 0 14px 16px;border-bottom:1px solid ${border};vertical-align:top;">
            <span style="${valueStyle}">${valueHtml}</span>
          </td>
        </tr>`;
    })
    .join("");
}

function emailShell(options: {
  preheader: string;
  eyebrow: string;
  title: string;
  intro: string;
  bodyHtml: string;
  footerNote: string;
}): string {
  const accent = "#5a1c1c";
  const bg = "#f7f4f1";
  const card = "#ffffff";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${escapeHtml(options.title)}</title>
</head>
<body style="margin:0;padding:0;background:${bg};font-family:Georgia,'Times New Roman',serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(options.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${bg};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
          <tr>
            <td style="padding-bottom:20px;text-align:center;">
              <span style="font-family:Georgia,'Times New Roman',serif;font-size:22px;letter-spacing:0.04em;color:${accent};">jcapturelab</span>
            </td>
          </tr>
          <tr>
            <td style="background:${card};border-radius:16px;border:1px solid #e8e2dc;overflow:hidden;box-shadow:0 8px 28px rgba(26,26,26,0.06);">
              <div style="height:4px;background:linear-gradient(90deg,${accent},#8b3a3a);"></div>
              <div style="padding:32px 28px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#8a7f78;">${escapeHtml(options.eyebrow)}</p>
                <h1 style="margin:0 0 14px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:400;line-height:1.25;color:#1a1a1a;">${escapeHtml(options.title)}</h1>
                <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#5c5c5c;">${options.intro}</p>
                ${options.bodyHtml}
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 8px 0;text-align:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 6px;font-size:12px;line-height:1.5;color:#8a7f78;">${options.footerNote}</p>
              <p style="margin:0;font-size:12px;color:#8a7f78;">
                <a href="https://jcapturelab.com" style="color:${accent};text-decoration:none;">jcapturelab.com</a>
                &nbsp;·&nbsp;
                <a href="https://instagram.com/jcapturelab" style="color:${accent};text-decoration:none;">@jcapturelab</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function followUpLine(details: SessionRequestDetails): string {
  if (details.phone) {
    return `I will text you at <strong style="color:#5a1c1c;">${escapeHtml(details.phone)}</strong> to work out timing and details.`;
  }
  if (details.instagram) {
    return `I will reach out on Instagram (<strong style="color:#5a1c1c;">${escapeHtml(details.instagram)}</strong>) to work out timing and details.`;
  }
  return "I will reach out using the contact info you provided to work out timing and details.";
}

export function buildOwnerSessionEmail(details: SessionRequestDetails): {
  html: string;
  text: string;
} {
  const rows = detailRows(details, { highlightPhone: !!details.phone });
  const contactLabel = displayContactSummary(
    details.fullName,
    details.phone,
    details.instagram,
  );
  const tableHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0;">
      ${renderRowsTable(rows)}
    </table>
    <p style="margin:24px 0 0;font-size:13px;line-height:1.5;color:#8a7f78;">
      Reach them at: ${escapeHtml(contactLabel)}. Reply by text is usually fastest when a phone number is listed.
    </p>`;

  const titleName = details.fullName || contactLabel;

  const html = emailShell({
    preheader: `${titleName}: ${details.sessionType} in ${details.townArea}`,
    eyebrow: "New session request",
    title: `${titleName} wants a session`,
    intro: `A new request just came in from <strong style="color:#1a1a1a;">jcapturelab.com</strong>. Nothing is confirmed until you reach out.`,
    bodyHtml: tableHtml,
    footerNote: "jcapturelab booking notification",
  });

  const text = [
    "New session request from jcapturelab.com",
    "",
    ...rowsToPlainText(rows),
    "",
    `Reach them at: ${contactLabel}`,
    "",
    "Nothing is confirmed until you reach out.",
  ].join("\n");

  return { html, text };
}

export function buildCustomerSessionEmail(details: SessionRequestDetails): {
  html: string;
  text: string;
} {
  const rows = detailRows(details);

  const tableHtml = `
    <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#8a7f78;">Your request</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
      ${renderRowsTable(rows)}
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0;">
      <tr>
        <td style="background:#faf8f6;border:1px solid #ebe6e2;border-radius:12px;padding:16px 18px;">
          <p style="margin:0;font-size:14px;line-height:1.55;color:#5c5c5c;">
            <strong style="color:#1a1a1a;">What happens next:</strong>
            This is not a confirmed booking yet. ${followUpLine(details)}
          </p>
        </td>
      </tr>
    </table>`;

  const html = emailShell({
    preheader: "Your jcapturelab session request was received.",
    eyebrow: "Request received",
    title: customerEmailTitle(details.firstName),
    intro:
      "I got your session request and will be in touch soon. Below is a copy of what you sent.",
    bodyHtml: tableHtml,
    footerNote: "Questions? Reply here or message @jcapturelab on Instagram.",
  });

  const followUpText = details.phone
    ? `I will text you at ${details.phone} to confirm timing and details.`
    : details.instagram
      ? `I will reach out on Instagram (${details.instagram}) to confirm timing and details.`
      : "I will reach out using the contact info you provided to confirm timing and details.";

  const text = [
    customerEmailSalutation(details.firstName),
    "",
    "Thanks for reaching out to jcapturelab. I received your session request. Nothing is booked yet.",
    followUpText,
    "",
    "Here is what you sent:",
    "",
    ...rowsToPlainText(rows),
    "",
    "If anything looks wrong, reply to this email or message @jcapturelab on Instagram.",
    "",
    "jcapturelab",
  ].join("\n");

  return { html, text };
}
