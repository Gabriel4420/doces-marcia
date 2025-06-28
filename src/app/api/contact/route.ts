import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  // Configurar o transporter do nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
  <div style="background:linear-gradient(135deg,#f8c8dc 0%,#f9e2f7 100%);padding:32px 0;min-height:100vh;font-family:'Poppins',Arial,sans-serif;">
    <table style="max-width:480px;margin:40px auto;background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.08);padding:32px 24px;">
      <tr>
        <td style="text-align:center;padding-bottom:24px;">
          <h2 style="color:#d14d72;font-size:2rem;margin:0 0 8px 0;font-family:'Pacifico',cursive;">Nova mensagem de contato</h2>
          <p style="color:#555;font-size:1rem;margin:0;">Você recebeu uma nova mensagem pelo site <b>Doces da Márcia</b>.</p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 0;">
          <div style="background:#f8c8dc;border-radius:8px;padding:16px 20px;margin-bottom:16px;">
            <p style="margin:0 0 8px 0;font-weight:600;color:#d14d72;">Nome:</p>
            <p style="margin:0;color:#333;">${name}</p>
          </div>
          <div style="background:#f8c8dc;border-radius:8px;padding:16px 20px;margin-bottom:16px;">
            <p style="margin:0 0 8px 0;font-weight:600;color:#d14d72;">Email:</p>
            <p style="margin:0;color:#333;">${email}</p>
          </div>
          <div style="background:#f8c8dc;border-radius:8px;padding:16px 20px;">
            <p style="margin:0 0 8px 0;font-weight:600;color:#d14d72;">Mensagem:</p>
            <p style="margin:0;color:#333;white-space:pre-line;">${message.replace(/\n/g, '<br/>')}</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="text-align:center;padding-top:32px;">
          <p style="color:#d14d72;font-size:0.95rem;margin:0;">Doces da Márcia &copy; ${new Date().getFullYear()}</p>
        </td>
      </tr>
    </table>
  </div>
  `;

  try {
    await transporter.sendMail({
      from: email,
      to: 'mconteperez@gmail.com',
      subject: `Contato do site - ${name}`,
      text: message,
      html,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao enviar email', details: error }, { status: 500 });
  }
} 