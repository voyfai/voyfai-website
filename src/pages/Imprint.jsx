import LegalPage from "../components/LegalPage";

export default function Imprint() {
  return (
    <LegalPage eyebrow="Legal" title="Imprint">
      <h2 id="company-details">Information according to § 5 DDG</h2>
      <dl className="legal-dl">
        <div>
          <dt>Company</dt>
          <dd>Voyfai GmbH</dd>
        </div>
        <div>
          <dt>Represented by</dt>
          <dd>Adrian Detlefs, James Maund</dd>
        </div>
        <div>
          <dt>Address</dt>
          <dd>
            Münzstraße 21
            <br />
            10178 Berlin
            <br />
            Germany
          </dd>
        </div>
        <div>
          <dt>Contact</dt>
          <dd>
            E-Mail:{" "}
            <a href="mailto:contact@voyfai.com">contact@voyfai.com</a>
          </dd>
        </div>
      </dl>

      <h2 id="register-entry">Register Entry</h2>
      <dl className="legal-dl">
        <div>
          <dt>Register</dt>
          <dd>Commercial register</dd>
        </div>
        <div>
          <dt>Register Location</dt>
          <dd>Berlin</dd>
        </div>
        <div>
          <dt>Registration Number</dt>
          <dd>HRB 256268 B</dd>
        </div>
        <div>
          <dt>VAT-ID</dt>
          <dd>DE363999375</dd>
        </div>
      </dl>

      <h2 id="disclaimer">Disclaimer</h2>

      <h3>Responsibility for links</h3>
      <p>
        "Our offer contains links to external websites of third parties, on
        whose contents we have no influence." The organization cannot assume
        liability for external content. Linked pages were examined for legal
        violations at linking time. Permanent monitoring is not deemed
        reasonable without concrete violation evidence. Unauthorized links
        will be removed upon discovery.
      </p>

      <h3>Liability for content</h3>
      <p>
        "The contents of our pages were created with the greatest care."
        However, no liability is assumed for accuracy, completeness, or
        timeliness. Per § 5 DDG, the provider bears responsibility for its
        own content and is "not obliged to monitor transmitted or stored
        information from third parties." Content violations discovered will
        be removed immediately.
      </p>

      <h3>Copyright</h3>
      <p>
        "The contents and works on these pages created by the site operators
        are subject to German copyright law." Duplication, editing,
        distribution require written consent. Third-party copyrights are
        observed and identified. Copyright infringements will be removed upon
        notification.
      </p>
    </LegalPage>
  );
}
