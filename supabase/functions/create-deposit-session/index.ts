import Stripe from 'https://esm.sh/stripe@13.0.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

Deno.serve(async (req) => {
  const { reservationId, amount, guestName, guestEmail, date, time, party } =
    await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    payment_method_options: {
      card: { request_three_d_secure: 'if_available' },
    },
    line_items: [
      {
        price_data: {
          currency: 'mxn',
          product_data: {
            name: `Depósito · Sushi IWA`,
            description: `Reservación para ${party} personas · ${date} ${time}`,
            images: ['https://sushi-iwa.com/images/chef-rolling.jpg'],
          },
          unit_amount: amount * 100, // Stripe uses centavos
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `https://sushi-iwa.com/reservacion-confirmada?session_id={CHECKOUT_SESSION_ID}&rid=${reservationId}`,
    cancel_url: `https://sushi-iwa.com/#reservar`,
    customer_email: guestEmail,
    metadata: { reservation_id: reservationId },
  });

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
