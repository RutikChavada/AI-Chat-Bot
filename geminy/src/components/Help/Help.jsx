import React from "react";
import { Link } from "react-router-dom";
import "./help.css";

const HelpPage = () => {
  return (
    <div className="help-wrapper">
      <div className="help-card">
        <h2>Help & Support</h2>
        <p className="help-subtext">
          Find answers to common questions, review our terms, or contact support.
        </p>

        {/* FAQ Section */}
        <div className="faq-section">
          <h3>Frequently Asked Questions</h3>

          <div className="faq-item">
            <h4>How do I reset my password?</h4>
            <p>
              Click on{" "}
              <Link to="/forgotpassword" className="help-link">
                Forgot Password
              </Link>{" "}
              and follow the instructions to reset your password.
            </p>
          </div>

          <div className="faq-item">
            <h4>How can I delete my account?</h4>
            <p>
              To delete your account, go to <b>Settings → Account</b> and click on
              "Delete Account." Note that this action is irreversible.
            </p>
          </div>

          <div className="faq-item">
            <h4>How do I contact customer support?</h4>
            <p>
              You can email us at{" "}
              <a href="mailto:support@example.com" className="help-link">
                support@example.com
              </a>{" "}
              or call our helpline at <b>+1 234 567 890</b>.
            </p>
          </div>

          <div className="faq-item">
            <h4>Is my data secure?</h4>
            <p>
              Yes! We follow industry best practices to keep your data secure and
              encrypted.
            </p>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="terms-section">
          <h3>Terms & Conditions</h3>
          <p>
            By using our platform, you agree to the following terms:
          </p>
          <ul>
            <li>You must be at least 18 years old to create an account.</li>
            <li>We reserve the right to suspend any account violating our policies.</li>
            <li>Unauthorized copying, distribution, or misuse of content is prohibited.</li>
            <li>We are not responsible for third-party links on our platform.</li>
          </ul>
          <p>
            Read the full terms{" "}
            <Link to="/terms" className="help-link">
              here
            </Link>
            .
          </p>
        </div>

        {/* Privacy Policy */}
        <div className="privacy-section">
          <h3>Privacy Policy</h3>
          <p>
            Your privacy is important to us. We collect necessary data only for
            service improvement. We do not share personal information without your
            consent.
          </p>
          <p>
            For more details, check our{" "}
            <Link to="/privacy" className="help-link">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* Contact Section */}
        <div className="contact-section">
          <h3>Still Need Help?</h3>
          <p>
            If you have further queries, feel free to contact us.
          </p>
          <a href="mailto:support@example.com" className="contact-btn">
            Contact Support
          </a>
        </div>

        <Link to="/" className="back-home">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default HelpPage;
