// ============================================================
//  Demo Payment Page — script.js
//  Workshop starter file for Interswitch API integration
// ============================================================

/**
 * startPayment()
 * --------------
 * Collects form data, validates it, logs it to the console,
 * and provides a clear TODO placeholder for the actual
 * Interswitch payment gateway integration.
 *
 * Called when the "Pay Now" button is clicked.
 */
function startPayment() {

  // -----------------------------------------------------------
  // 1. COLLECT FORM VALUES
  // -----------------------------------------------------------
  const name   = document.getElementById("name").value.trim();
  const email  = document.getElementById("email").value.trim();
  const amount = document.getElementById("amount").value.trim();

  // -----------------------------------------------------------
  // 2. BASIC VALIDATION
  // -----------------------------------------------------------
  if (!name) {
    showToast("⚠️ Please enter your full name.", "error");
    document.getElementById("name").focus();
    return;
  }

  if (!email || !isValidEmail(email)) {
    showToast("⚠️ Please enter a valid email address.", "error");
    document.getElementById("email").focus();
    return;
  }

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    showToast("⚠️ Please enter a valid amount.", "error");
    document.getElementById("amount").focus();
    return;
  }

  // -----------------------------------------------------------
  // 3. LOG PAYMENT DETAILS TO CONSOLE
  //    (Open DevTools → Console to see this output)
  // -----------------------------------------------------------
  console.log("=== Payment Details ===");
  console.log("Name:   ", name);
  console.log("Email:  ", email);
  console.log("Amount: ₦" + Number(amount).toLocaleString());
  console.log("========================");

  // -----------------------------------------------------------
  // 4. SHOW LOADING STATE ON BUTTON
  // -----------------------------------------------------------
  setButtonLoading(true);

  // -----------------------------------------------------------
  // 5. SIMULATE A SHORT ASYNC DELAY (remove when integrating)
  // -----------------------------------------------------------
  setTimeout(function () {

    // --------------------------------------------------------
    // TODO: Integrate Interswitch payment gateway here
    //
    // Example steps when you're ready:
    //
    // Step 1 — Import or load the Interswitch Inline JS SDK:
    //   <script src="https://newwebpay.qa.interswitchng.com/inline-checkout.js"></script>
    //
    // Step 2 — Build the payment payload:
    //   const paymentPayload = {
    //     merchant_code:    "YOUR_MERCHANT_CODE",
    //     pay_item_id:      "YOUR_PAY_ITEM_ID",
    //     txn_ref:          "TXN_" + Date.now(),          // unique per transaction
    //     amount:           Number(amount) * 100,         // Interswitch uses kobo (₦1 = 100)
    //     currency:         566,                          // 566 = Nigerian Naira (NGN)
    //     site_redirect_url: "https://your-site.com/callback",
    //     customer_email:   email,
    //     customer_name:    name,
    //     onComplete:       handlePaymentResponse,        // callback on success/failure
    //     mode:             "TEST",                       // switch to "LIVE" in production
    //   };
    //
    // Step 3 — Trigger the Interswitch checkout popup:
    //   window.webpayCheckout(paymentPayload);
    //
    // Step 4 — Handle the response in your callback:
    //   function handlePaymentResponse(response) {
    //     console.log("Interswitch Response:", response);
    //     if (response.resp === "00") {
    //       // Payment successful
    //     } else {
    //       // Payment failed or cancelled
    //     }
    //   }
    // --------------------------------------------------------

    // Placeholder success feedback for the demo
    setButtonLoading(false);
    showToast("✅ startPayment() called! Check the console.", "success");
    console.log("✅ Ready for Interswitch integration. See TODO in script.js.");

  }, 1500);
}


// ============================================================
//  HELPER FUNCTIONS
// ============================================================

/**
 * isValidEmail(email)
 * Simple regex check for a valid email format.
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * setButtonLoading(isLoading)
 * Swaps the button text for a spinner while processing.
 */
function setButtonLoading(isLoading) {
  const btn = document.querySelector(".pay-btn");

  if (isLoading) {
    btn.classList.add("loading");
    btn.innerHTML = `
      <span class="spinner"></span>
      <span class="btn-text">Processing...</span>
    `;
  } else {
    btn.classList.remove("loading");
    btn.innerHTML = `
      <span class="btn-text">Pay Now</span>
      <span class="btn-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </span>
    `;
  }
}

/**
 * showToast(message, type)
 * Briefly shows a notification at the bottom of the screen.
 * @param {string} message - Text to display
 * @param {string} type    - "success" | "error" | "" (default dark)
 */
function showToast(message, type) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast " + (type || "");
  toast.classList.add("show");

  setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}
