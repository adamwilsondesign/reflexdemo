/**
 * Legal copy for /privacy and /terms.
 * Generated verbatim from the live site text (content/_scraped/privacy.md, terms.md).
 * Do not edit wording here without legal sign-off.
 */
export type LegalBlock =
  | { type: "h2" | "h3" | "h4"; id: string; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type LegalDoc = {
  title: string;
  subtitle: string | null;
  /** Verbatim "Updated …" line from the source document. */
  updated: string | null;
  blocks: LegalBlock[];
};

export const PRIVACY: LegalDoc = {
  "title": "Privacy Policy",
  "subtitle": null,
  "updated": "Updated January 26th, 2022",
  "blocks": [
    {
      "type": "p",
      "text": "In brief: We are Knabble, Inc. (“Reflexivity,” “we”, “us”, or “our”). We respect your privacy and work hard to protect the confidentiality of information that you give us. We will share your Personal Data with third parties only in the event that it’s needed for the provision of services and data you have requested."
    },
    {
      "type": "h2",
      "id": "about-us",
      "text": "About Us"
    },
    {
      "type": "p",
      "text": "Reflexivity is the sole owner of the reflexivity.com, reflexivity.ai, toggle.global, and toggle.ai websites (collectively, the “Website”) and all of the information collected on it. Reflexivity collects information from users in several ways through the Website."
    },
    {
      "type": "p",
      "text": "This privacy policy applies to Personal Data (defined below) that we collect from you when you visit the Website or create an account (“you” or “your” being interpreted accordingly). As used in this privacy policy, “Personal Data” means any information that relates to you from which you can be identified."
    },
    {
      "type": "p",
      "text": "This policy provides information on what Personal Data we collect, why we collect Personal Data, how it is used, the basis on which your Personal Data is processed, how it is stored, and how we share information. Reflexivity makes various products and services available through its Website (each a “Service”), and Services may require permission to use your Personal Data in addition to what is noted in this policy. You should read all notices, information and other materials provided to you when signing up for or using a Service."
    },
    {
      "type": "p",
      "text": "By using our Website or submitting your Personal Data, you are agreeing to accept the terms of this privacy policy, so please read it carefully."
    },
    {
      "type": "h2",
      "id": "updates",
      "text": "Updates"
    },
    {
      "type": "p",
      "text": "We may update this privacy policy at our discretion from time to time by posting a new version on our Website. You should check our Website occasionally to ensure any changes made are suitable for you. If required by applicable law, you will be informed of any significant changes made to the privacy policy. Please note that laws related to privacy vary by a person’s location, residence, citizenship, or similar. If you have a privacy-related inquiry or request, we may ask you to provide additional details relevant to your request such that our legal team can verify what the applicable law to you or your request may be."
    },
    {
      "type": "h2",
      "id": "personal-data-that-we-collect",
      "text": "Personal data that we collect"
    },
    {
      "type": "p",
      "text": "There is no need to create an account when viewing information on the Website, such as a Reflexivity or Toggle Insight℠ made publicly available."
    },
    {
      "type": "h3",
      "id": "data-we-receive-from-you",
      "text": "Data we receive from you"
    },
    {
      "type": "h4",
      "id": "personal-data",
      "text": "Personal Data"
    },
    {
      "type": "p",
      "text": "We collect Personal Data about you when you provide such information directly to us, when third parties such as our business partners or service providers provide us with Personal Data about you, or when Personal Data about you is automatically collected in connection with your use of our Services."
    },
    {
      "type": "h4",
      "id": "user-accounts",
      "text": "User Accounts"
    },
    {
      "type": "p",
      "text": "If you decided to create an account, you will need to provide us with some Personal Data so we can provide you with access to our additional services that users benefit from. You may also elect to provide us with additional information about you, as described below."
    },
    {
      "type": "p",
      "text": "During registration you will be required to provide us with:"
    },
    {
      "type": "ul",
      "items": [
        "your email address;",
        "your first name, last name, role and company."
      ]
    },
    {
      "type": "p",
      "text": "The following information will not be publicly displayed:"
    },
    {
      "type": "ul",
      "items": [
        "your first and last name, email, role, and company."
      ]
    },
    {
      "type": "p",
      "text": "If you register to be a user of any of our Services for which you pay us a fee, such as Toggle Copilot℠, Toggle Pro℠, or any other Reflexivity-offered direct subscription (a “Paid User”), our third party verified payment processor will also process information about your debit/credit card and bank account information that we require for the purpose of recording and processing your account registration. For further details, please refer to the point below titled “Payment information,” under the section headed, “When we share your personal information.”"
    },
    {
      "type": "h4",
      "id": "contact-data",
      "text": "Contact data"
    },
    {
      "type": "p",
      "text": "We also process any Personal Data you choose to give when corresponding with us by phone, email, or otherwise visiting and interacting with this Website or any other websites we operate."
    },
    {
      "type": "h4",
      "id": "cookies-and-other-technologies",
      "text": "Cookies and other technologies"
    },
    {
      "type": "p",
      "text": "We use browser cookies (small text files placed on your device) to administer our Website, gather and analyze statistical information, ensure security, to fight spam, and for advertising purposes. Cookies allow us to provide you with a better user experience when you browse our Website and helps to improve its features. More detailed information on the use of cookies can be found in our Cookies Policy."
    },
    {
      "type": "h4",
      "id": "log-files",
      "text": "Log files"
    },
    {
      "type": "p",
      "text": "Like most websites, we use web server log files. Records in our log files include internet protocol (IP) addresses (see the “Device information” section below for further details), browser types, internet service providers, referring pages, exit pages, platform types, and date/time stamps. We use web server log files to administer the site, provide broad traffic information for site planning purposes, and to ensure that our terms of service agreement is being adhered to. Note that IP addresses are not tied to Personal Data in our web server log files."
    },
    {
      "type": "h4",
      "id": "device-information",
      "text": "Device information"
    },
    {
      "type": "p",
      "text": "We collect the following information about the devices you use to visit the site: IP address of the device (from which we can also infer the country you are connecting from at the time of your visit to the Website), operating system, and browser version. We collect this information to prevent spam and abuse of our services. IP addresses may be considered Personal Data in certain jurisdictions, such as in the European Economic Area (“EEA”), and will be treated in accordance with this privacy policy."
    },
    {
      "type": "p",
      "text": "When you are using our mobile application, we may collect your general device information, device identifier (for example, Google Advertising ID, if you are using an Android device, or Advertising Identifier (IDFA), if you are using an iOS device), network information and application interaction events for analytics purposes, and to develop, test, and improve our services further. Our mobile applications use third party services that may collect such information. For further details, please refer to the Analytics providers section below."
    },
    {
      "type": "h2",
      "id": "data-we-receive-from-third-parties",
      "text": "Data we receive from third parties"
    },
    {
      "type": "p",
      "text": "Information from our service providers: We receive information collected by third parties about your use of the Services. For example, we may use analytics service providers to analyze how you interact and engage with the Services and our advertisements, so we can learn and make enhancements to offer you a better experience. Some of these entities may use Cookies, web beacons and other technologies to collect information about your use of the Services and other websites, which may include tracking activity across time and unaffiliated properties, including your IP address, web browser, pages viewed, time spent on pages, links clicked and conversion information. Third parties may also help us provide you with customer support, and provide us with information so that we may help you use our Services."
    },
    {
      "type": "p",
      "text": "Account information for third party services: If you provide your third-party account credentials to us or otherwise sign in to the Services through a third party site or service, you understand some content and/or information in those accounts (“Third Party Account Information”) may be transmitted into your account with us if you authorize such transmissions, and that Third Party Account Information transmitted to our Services is covered by this Privacy Policy; for example, information from your public profile, if the third party service and your account settings allow such sharing. The information we receive will depend on the policies and your account settings with the third party service."
    },
    {
      "type": "p",
      "text": "Information from our advertising partners: We receive information about you from some of our service providers who assist us with marketing or promotional services related to how you interact with our websites, applications, products, services, advertisements or communications."
    },
    {
      "type": "h2",
      "id": "how-personal-information-is-used",
      "text": "How personal information is used"
    },
    {
      "type": "p",
      "text": "We use Personal Data in various ways that are necessary to provide the services you intend to use the Website for, certain legitimate interests, and as a necessity in order to comply with applicable law, as further described below."
    },
    {
      "type": "p",
      "text": "We do not generally rely on your consent to allow us to process your Personal Data if there is another lawful ground available. If we do rely on your consent, we will make this clear to you at that time."
    },
    {
      "type": "h3",
      "id": "profile",
      "text": "Profile"
    },
    {
      "type": "p",
      "text": "A profile is a set of information for each individual user that details his/her viewing preferences. We do not use stored user settings for marketing purposes. User settings are kept solely for the purpose of customizing the user’s experience when using the Website or user accounts."
    },
    {
      "type": "h3",
      "id": "user-account-and-profile-operations",
      "text": "User account and profile operations"
    },
    {
      "type": "p",
      "text": "We use your contact details, such as email address in the following ways:"
    },
    {
      "type": "ul",
      "items": [
        "to authenticate your user account, ensure its security along with the security of our services, and to prevent spam, fraud, and abuse;",
        "to acknowledge, confirm, and deal with your user account;",
        "to send all new users a welcome activation email to verify their email address;",
        "(For Paid Users) to provide you with subscription services and contact you regarding your use of such services. This is necessary for us to implement your requests; and",
        "Paid Users will also receive a notification email from Checkout.com if there are any issues regarding billing their cards for auto-renew subscriptions. Users cannot opt-out of these messages, though they can delete their account."
      ]
    },
    {
      "type": "h3",
      "id": "marketing",
      "text": "Marketing"
    },
    {
      "type": "p",
      "text": "We may send you marketing emails about our products or services that are similar to the products or services you are subscribed to, including information about events and other promotions we feel may interest you. This is unless you have indicated to us that you do not wish to receive communications in this manner. We will send you other promotional information by email only with your consent, which was given at the time you provided us with your Personal Data. Users can opt-out of receiving marketing communications at any time by clicking “unsubscribe” in one of the emails (for more information on your rights, please see the “User Rights” section below)."
    },
    {
      "type": "h3",
      "id": "social-notifications",
      "text": "Social Notifications"
    },
    {
      "type": "p",
      "text": "We can notify you via email about investing ideas relevant to you. You can refuse to receive such notifications at any time by adjusting your profile settings."
    },
    {
      "type": "h3",
      "id": "service-related-announcements",
      "text": "Service-Related Announcements"
    },
    {
      "type": "p",
      "text": "On rare occasions, it is necessary to send out service-related announcements. For instance, if our service is interrupted for a prolonged period or a major functionality upgrade is released, we might send all users an email message."
    },
    {
      "type": "h3",
      "id": "customer-service",
      "text": "Customer Service"
    },
    {
      "type": "p",
      "text": "When you open a support ticket on our Website, we use your contact details as well as information about your device, server logs, a description of the problem, along with any other supporting materials (videos, screenshots, etc.) to help resolve the issue(s)."
    },
    {
      "type": "h3",
      "id": "legitimate-interests",
      "text": "Legitimate interests"
    },
    {
      "type": "p",
      "text": "We will process your Personal Data as necessary for certain legitimate business interests, which include the following:"
    },
    {
      "type": "ul",
      "items": [
        "where we are asked to respond to any of your inquiries, comments, or grievances;",
        "to administer our Website in order to better understand how visitors interact with the Website and ensure that it is presented in the most effective manner for you and your computer/device;",
        "to develop and improve our mobile applications;",
        "to share Personal Data among our affiliated businesses for administrative purposes, provide subscription services, and in relation to our sales and marketing activities, except where we require your consent, as described above;",
        "to send you information about our products or services that are similar to the products or services you subscribed to (unless you have refused or opted out of receiving these emails at the time you provided us with your email address or you have indicated to us that you do not wish to receive communications in this manner). Our legitimate interest is to ensure our marketing is relevant to you, so we may process your data to send you information on our products or services that is specifically tailored to your interests;",
        "we may anonymise, aggregate and de-identify the data that we collect and use this data for our own internal business purposes, including sharing it with our business partners, our affiliated businesses, agents and other third parties for commercial, statistical and market research purposes. For example, to allow those parties to analyze patterns among groups of people and conducting research on demographics, interests, and behavior;",
        "for internal business/technical operations, including troubleshooting, data analysis, testing, research, statistical and survey purposes, and as part of our efforts to keep our Website, network, and information systems secure; and",
        "to (a) comply with legal obligations, (b) respond to requests from competent authorities; (c) enforce our Terms of Use or House Rules; (d) protect our operations or those of any of our affiliated businesses; (e) protect our rights, safety or property, and/or that of our affiliated businesses, you or others; and (f) enforce or defend legal rights, or prevent damage. This includes responses to court orders or subpoenas, as well as other judicial or regulatory processes."
      ]
    },
    {
      "type": "p",
      "text": "As used in this privacy policy, “legitimate interests” means the interests of Reflexivity and our affiliated businesses in conducting and managing our business. When we process your Personal Data for our legitimate interests, we make sure to consider and balance any potential impact on you and your rights under data protection laws. Our legitimate interests do not automatically override your interests. We do not use Personal Data for activities where our interests override the impact they may have on our users, unless we have their explicit consent or those activities are otherwise required or permitted by law. You may have the right to object to the processing of your Personal Data that is based on our legitimate interests at any time, on grounds relating to your particular situation, location, jurisdiction, or similar (for more information on your rights, please see the “User Rights” section below)."
    },
    {
      "type": "h2",
      "id": "when-would-we-share-personal-information",
      "text": "When would we share personal information"
    },
    {
      "type": "p",
      "text": "We may share your Personal Data with third parties in the following situations:"
    },
    {
      "type": "ul",
      "items": [
        "Service providers: Reflexivity, like many businesses, occasionally engages with selected third parties who act on our behalf to support our operations, such as (i) card processing or payment services (see the point below headed “Payment Information”), (ii) IT suppliers and contractors (i.e. data hosting providers or delivery partners) as necessary to provide IT support and enable us to provide subscription services and other goods/services available on this Website or to users, (iii) web and mobile analytics providers, (iv) providers of digital advertising services, and (v) providers of marketing and sales software solutions. Pursuant to our instructions, these parties may access, process or store your Personal Data in the course of performing their duties to us and solely in order to perform the services we have hired them to provide.",
        "Payment information: Paid Users must provide payment information (name, credit card information or Checkout.com account information). This information is used for billing purposes only and is processed by Checkout.com, our payment processor. When you are making a payment, we do not have access to your personal and/or credit card information. Should we have any issues with processing an order, the email address you have provided will be used to contact you.",
        "Third Party Content Providers: When you buy market data from a provider, we give them your contact details, phone number, address, and email and you sign the agreement. This data is also processed by the provider in order to provide you with access to the data.",
        "Reflexivity affiliated businesses: In order to provide the services you request from us, our affiliated businesses may access and process the information which we collect from you for the purposes described above, including offering products and services to you. Our affiliated businesses will only use your data for the purposes for which we originally collected said data.",
        "Analytics providers: We may use third-party service providers to monitor and analyze the use of our services and mobile applications. We use this information to analyze and improve the work of our services and mobile applications.",
        "We may use Google Analytics as a web analytics service. For more information on Google Analytics privacy practices, you can check with Google here.",
        "Business transfers: If we sell our business or our company assets are acquired by a third party Personal Data held by us about our general account users, subscription account users or customers may be one of the transferred assets.",
        "Administrative and legal reasons: If we need to disclose your Personal Data (i) to comply with a legal obligation and/or judicial or regulatory proceedings, a court order or other legal process, (ii) to enforce our Terms of Use, House Rules or other applicable contract terms that you are subject to, or (iii) to protect us or our contractors against loss or damage. This may include, but is not limited to, exchanging information with the police, courts or law enforcement organisations."
      ]
    },
    {
      "type": "h2",
      "id": "security-of-personal-data",
      "text": "Security of Personal Data"
    },
    {
      "type": "p",
      "text": "We use technical and organizational safeguards to protect your Personal Data and require third parties with whom we work to do the same."
    },
    {
      "type": "p",
      "text": "We use Transport Layer Security (TLS) encryption technology in order to protect certain information that you submit to us. This technology protects you from having your information intercepted by anyone while it is being transmitted to Reflexivity Stripe.com, Checkout.com, or the relevant payment processor for your jurisdiction. While on a secure page, such as our order form, the “lock” icon in the browser window is displayed, confirming that a secure and encrypted connection has been established with the Website. We work hard to ensure that our Website is secure and that we meet industry standards. We also use other safeguards, such as firewalls, authentication systems (i.e. passwords, and personal identification numbers), and access control mechanisms to control unauthorized access to systems and data. If you have chosen to create an account, you are responsible for doing everything you reasonably can to keep your access details secret. You must not share these details with anyone else."
    },
    {
      "type": "p",
      "text": "We also do our best to protect user information offline. All of our users’ personal information is restricted to our offices. Only employees who need to see the information to perform their jobs are allowed to access it."
    },
    {
      "type": "p",
      "text": "The servers that store Personal Data are located in a secure environment in a locked facility."
    },
    {
      "type": "p",
      "text": "We are constantly improving the ways we secure, store, and process the data we collect, including the addition of physical security measures that help us counter unauthorized access to our systems. However, no method of electronic transmission or storage is 100% secure. Therefore, we cannot guarantee its absolute security."
    },
    {
      "type": "h2",
      "id": "children-and-sensitive-personal-data",
      "text": "Children and sensitive Personal Data"
    },
    {
      "type": "p",
      "text": "This Website is not intended for children who are under the age of 18. We do not knowingly contact or collect personal information from children below the age of 18 years, nor data related to race, ethnicity, religious beliefs, political opinions, trade union data, health, or sexual orientation. Please consult Art. 9 GDPR for more information that may be applicable to you. If you believe we have inadvertently collected such information, please contact us at privacy@reflexivity.com immediately so that we can either obtain special consent or delete the information."
    },
    {
      "type": "h2",
      "id": "third-party-sites",
      "text": "Third Party Sites"
    },
    {
      "type": "h3",
      "id": "links-to-other-sites",
      "text": "Links to other sites"
    },
    {
      "type": "p",
      "text": "At our discretion we may add links (web links) to other websites from our Website. These websites can be run by third parties with separate and independent privacy policies. We, therefore, have no responsibility nor are we liable for any content, activities or privacy policies of these linked sites. We suggest you read the privacy policy of each and every site that you visit."
    },
    {
      "type": "h3",
      "id": "our-hosted-charting-solutions",
      "text": "Our hosted charting solutions"
    },
    {
      "type": "p",
      "text": "Some business partners use our charting solutions on their own websites. Such sites may display messages such as “Powered by Reflexivity” or similar. We do not control the privacy policies of these sites, regardless of whether or not these messages are displayed. You should read the privacy policy for the specific website you are visiting."
    },
    {
      "type": "h2",
      "id": "user-rights",
      "text": "User rights"
    },
    {
      "type": "p",
      "text": "Individuals subject to European data protection laws may have data subject rights in relation to the Personal Data we hold on them. This may, in and of itself, be subject to limitations and/or restrictions."
    },
    {
      "type": "p",
      "text": "If you are located in the EEA, please contact us to exercise your rights. If you have questions about your rights in the EEA, you should visit https://gdpr-info.eu/ for details."
    },
    {
      "type": "p",
      "text": "If you have concerns about our privacy practices, including the way we handle or have your Personal Data, or if you wish to exercise any privacy rights, please contact us at privacy@reflexivity.com. Note that we may also need to ask you for further information to verify your identity before we can respond to any request."
    },
    {
      "type": "h2",
      "id": "european-union-residents-international-data-transfers",
      "text": "European Union residents: International data transfers"
    },
    {
      "type": "p",
      "text": "Knabble, Inc. is based in the United States and has affiliates in the UK. The information collected through the Website will be stored on servers located in the United States, European Union, and other destinations (including outside the EEA), and by our service providers and affiliated businesses for the purposes described above. This is necessary to enable you to navigate and use our Website. The data may be transmitted to our service providers and affiliates supporting our business operations (described above)."
    },
    {
      "type": "p",
      "text": "Note that the countries concerned may not provide the same legal standards for protection of your Personal Data that you have in the EEA. If we transfer your Personal Data to countries outside of the EEA, we will take the necessary steps to ensure your information receives an adequate level of security protection where it is processed and that your rights continue to be protected. Some of our service providers (i.e. Amazon Web Services, Inc.) are certified to the Privacy Shield, a framework operated by the U.S. Department of Commerce, that permits the transfer of Personal Data outside the EEA (or, as applicable, Switzerland) to certified companies in accordance with EEA data protection law (for more information, please visit Privacy Shield website)."
    },
    {
      "type": "p",
      "text": "If you would like to receive more information on the safeguards that we implement, please contact us."
    },
    {
      "type": "h2",
      "id": "contact-information",
      "text": "Contact information"
    },
    {
      "type": "p",
      "text": "If you have any questions or suggestions regarding Personal Data processing, please contact us at privacy@reflexivity.com."
    },
    {
      "type": "p",
      "text": "If you disagree with this privacy policy at any point or time, you should stop using our Website and delete your user account."
    },
    {
      "type": "p",
      "text": "Knabble, Inc. 589 5th Avenue, Ste 606A New York, NY 10017"
    },
    {
      "type": "p",
      "text": "If you are an individual in the EEA, you can also contact one of our UK representatives, on dpo@reflexivity.com who has been appointed by Reflexivity as a representative in the EEA, pursuant to Article 27 of the European Union General Data Protection Regulation on matters related to the processing of Personal Data that take place in the EEA."
    }
  ]
};

export const TERMS: LegalDoc = {
  "title": "Terms and Conditions",
  "subtitle": "REFLEXIVITY SERVICE AGREEMENT",
  "updated": "Updated January 1, 2026",
  "blocks": [
    {
      "type": "p",
      "text": "This Reflexivity Service Agreement (“RSA”) describes the terms and conditions through which you are subscribing to the Reflexivity platform (“Reflexivity”) and all services provided through it. The date that you subscribe to Reflexivity is the date that this RSA applies to you, and it guides what you can and cannot do with anything you access via Reflexivity’s services (the “Effective Date”). The RSA is an agreement between Knabble, Inc. (dba Reflexivity) (which is what we mean when we say “we”, “us” or “our”), and you as the subscriber to Reflexivity (“Customer” or “you”). Each of Customer or Knabble, Inc. may be referred to individually as a “Party” and collectively as the “Parties”. Additionally, whether or not a person has subscribed to Reflexivity, any person that uses or accesses Reflexivity is agreeing to be bound by this RSA as if they were the Customer."
    },
    {
      "type": "p",
      "text": "If you are an entity or organization interested in a Reflexivity license for multiple users, please contact partnerships@reflexivity.com for pricing and license information."
    },
    {
      "type": "p",
      "text": "Reflexivity is a powerful, natural language and intelligent research and analysis engine that pairs state-of-the art analytics, extensive datasets, and proprietary generative artificial intelligence available as software-as-a-service. By subscribing to Reflexivity on the terms set forth in this RSA, you are entering a binding legal contract to abide by the terms and conditions described herein. Depending on the jurisdiction where you reside, or where a certain jurisdiction’s laws apply to you and your use of Reflexivity, you may have certain rights that cannot be limited by a contract like this RSA. The RSA’s terms are in no way intended to limit such rights."
    },
    {
      "type": "h2",
      "id": "agreement-and-conflicting-terms",
      "text": "Agreement and Conflicting Terms"
    },
    {
      "type": "p",
      "text": "This RSA consists of the body of this document and any other referenced terms and conditions you agreed to at the time you subscribed to Reflexivity. If there is any conflict between this RSA and any other terms and conditions referenced, this RSA controls."
    },
    {
      "type": "h2",
      "id": "services-and-access-license",
      "text": "Services and Access License"
    },
    {
      "type": "h3",
      "id": "access-to-services",
      "text": "Access to Services"
    },
    {
      "type": "p",
      "text": "Subject to the terms of this RSA, we will provide Customer access to Reflexivity’s services as described herein (the “Services”) for one year from the date of subscription and any subsequent annual renewal periods (the “Term”) solely for use by Authorized Users (defined below). For each such Term, we hereby grant a non-exclusive, non-transferable license to Customer, for Customer to access and use the Services as described herein."
    },
    {
      "type": "p",
      "text": "“Content” means any and all information and data contained on or accessible through the Services, including third-party data."
    },
    {
      "type": "h3",
      "id": "authorized-users",
      "text": "Authorized Users"
    },
    {
      "type": "p",
      "text": "Authorized users of Services are natural persons (not corporations or any entity of any type whatsoever) that are subscribing to Reflexivity to use the Services for internal research and analysis purposes only. By subscribing to Reflexivity, you are attesting that you are not: (i) an employee of any company or entity that is attempting to develop services that are similar to or competitive with the Services or Reflexivity; (ii) you are not an employee of any bank or similar lending entity; (iii) you are not an employee of a wealth management or asset management entity except a solo practice; and (iv) you are not an employee of an entity that has an existing enterprise-level Reflexivity agreement with us that doesn’t already include you as an Authorized User. Customer shall not permit anyone other than an Authorized User to access Services. Nothing in this RSA imposes an obligation on us to supervise or monitor use of the Services."
    },
    {
      "type": "h3",
      "id": "fees-and-payments",
      "text": "Fees and Payments"
    },
    {
      "type": "p",
      "text": "Customer shall pay the fees set forth at the time of subscription and in accordance with the terms thereof. We may suspend the Services if Customer does not pay outstanding balances promptly. Prior to the beginning of any renewal period, we will notify Customer of any change in the annual subscription fee for access to Reflexivity."
    },
    {
      "type": "h2",
      "id": "license-and-use-restrictions",
      "text": "License and Use Restrictions"
    },
    {
      "type": "h3",
      "id": "license-restrictions",
      "text": "License Restrictions"
    },
    {
      "type": "p",
      "text": "Customer shall not, and shall not permit any person or entity to:"
    },
    {
      "type": "ul",
      "items": [
        "use the Services on a service bureau, time sharing or any similar basis, or for the benefit of any other person or entity that is not an Authorized User",
        "redistribute any part of the Content except as expressly permitted in this RSA or through any built-in sharing or distribution features within Reflexivity",
        "use the Services or any information acquired from or based on the Services or Content to create products or services intended to compete with or replace the Services",
        "attempt to recreate or obtain any of the raw data comprising any Content",
        "alter or make derivative works of Reflexivity",
        "reverse engineer, reverse assemble or decompile, or otherwise attempt to derive source code from Reflexivity",
        "use, or allow the use of, the Services for any unfair or deceptive practices or in contravention of any federal, state, local, foreign, or other Applicable Laws",
        "introduce in or to Reflexivity any virus, malware, or any other malicious code or program, or implement a denial of service attack or introduce or implement any other code or routine which results in disruption or damage to the Services, alter, damage or delete any data or retrieve or record information about the Services",
        "act in a fraudulent, tortious malicious, or negligent manner when using the Services"
      ]
    },
    {
      "type": "h3",
      "id": "specific-conduct",
      "text": "Specific Conduct"
    },
    {
      "type": "p",
      "text": "Certain features of Reflexivity may allow Authorized Users to input language, create labels, lists, categories, input words or phrases while using the Services (“User Language”). Certain Services may allow Authorized Users to save User Language on their dashboards, combine it with Content and visualizations, as well as export it or share it with others. We may suspend Services access temporarily or permanently to any Authorized User that uses User Language of the following types:"
    },
    {
      "type": "ul",
      "items": [
        "Hateful references: Behavior or Content that references forms of violence or violent events where a protected category was the primary target or victims, where the intent is to use such content to harass, offend, or otherwise use such content in any manner that isn’t consistent with research and analysis of financial markets within the context of Reflexivity. Attempting to exploit our generative artificial intelligence using or attempting to generate hateful or offensive content is also prohibited.",
        "Incitement: Behavior or Content targeting individuals or groups of people belonging to protected categories under the law is prohibited. Such behavior includes but is not limited to inciting fear, promoting fearful or hateful stereotypes, attempting to deliberately mislead others with false or misleading information, or inciting others to engage in any behavior in violation of the permitted use and license herein.",
        "Disparaging: Behavior or Content disparaging us, our customers, or any other person or entity affiliated with us. The forum for discontent with any of the foregoing is our customer support channels, a customer’s support line, or a forum unrelated to the Services.",
        "Unlawful Acts: Any use of the Services in violation of Applicable Laws is prohibited."
      ]
    },
    {
      "type": "h2",
      "id": "retained-rights",
      "text": "Retained Rights"
    },
    {
      "type": "p",
      "text": "We retain all rights and remedies afforded under the copyright, trademark, service mark, patent, and other laws of the United States and the States thereof, including without limitation any laws designed to protect proprietary or confidential information. This RSA is not a waiver of any such rights, including rights that would survive termination of this RSA."
    },
    {
      "type": "h2",
      "id": "confidentiality",
      "text": "Confidentiality"
    },
    {
      "type": "p",
      "text": "The Services provided by us, and the systems used to provide the Services are considered Confidential Information, subject to Section 7 (Public Information). “Confidential Information” shall mean, any confidential, proprietary and nonpublic information in written, electronic, verbal or any other form which is related, directly or indirectly, to the Services and disclosed or made available after the Effective Date by or on behalf of a Party (the “Disclosing Party”) to the other Party (the “Receiving Party”) (or to any Representative of the Receiving Party). As used herein, a Party’s “Representatives” shall mean the directors, officers, employees, agents, partners, attorneys, accountants and advisors of such Party or such Party’s affiliates."
    },
    {
      "type": "h2",
      "id": "public-information",
      "text": "Public Information"
    },
    {
      "type": "p",
      "text": "The following types of information shall not be considered Confidential Information:"
    },
    {
      "type": "ul",
      "items": [
        "Information that was a matter of public knowledge prior to the time of its disclosure under this RSA or became a matter of public knowledge after the time of its disclosure under this RSA through means other than an unauthorized disclosure resulting from an act or omission by the Receiving Party",
        "Information that was independently developed or discovered by the Receiving Party without reference to the Disclosing Party’s Confidential Information",
        "Information that becomes available to the Receiving Party on a non-confidential basis from a third party, provided that such third party is not, to the Receiving Party’s knowledge, bound by an obligation of confidentiality to the Disclosing Party with respect to such Confidential Information",
        "Information that was already in the possession of the Receiving Party or its Representatives at the time it was disclosed or made available to the Receiving Party or its Representatives by the Disclosing Party, provided that such Confidential Information was not known by the Receiving Party or its Representatives to be subject to obligations of confidentiality"
      ]
    },
    {
      "type": "h2",
      "id": "confidentiality-obligations",
      "text": "Confidentiality Obligations"
    },
    {
      "type": "p",
      "text": "With respect to Confidential Information, the Receiving Party shall:"
    },
    {
      "type": "ul",
      "items": [
        "Maintain the Confidential Information in confidence, using at least the same degree of care in safeguarding the Disclosing Party’s Confidential Information as it uses in safeguarding its own Confidential Information, subject to a minimum standard of reasonable diligence and protection",
        "Restrict disclosure of the Confidential Information solely to those of its Representatives with a “need to know” (“Permitted Representatives”), where a “need to know” means that the Representative requires the Confidential Information in order to facilitate compliance with the terms of, or exercise rights under, this RSA",
        "Advise Permitted Representatives who gain access to Confidential Information of their obligations with respect to the Confidential Information",
        "Make only the number of copies of the Confidential Information necessary to disseminate the Confidential Information to Permitted Representatives or use the Services according to permitted uses",
        "Ensure that all confidentiality and proprietary notices set forth on the Confidential Information are reproduced in full on such copies"
      ]
    },
    {
      "type": "p",
      "text": "The Receiving Party shall, and shall cause its Representatives to, within five (5) days after any termination of this RSA return all Confidential Information, including all copies thereof, to the Disclosing Party or, unless prohibited by law, destroy all such Confidential Information and certify the same in writing to the Disclosing Party; provided, however, that the Receiving Party shall have the right to retain a copy of the Confidential Information for audit or regulatory compliance purposes."
    },
    {
      "type": "p",
      "text": "The obligations of this Section 8 (Confidentiality Obligations) shall not apply to any Confidential Information that is required to be disclosed pursuant to Applicable Laws (as determined in good faith by Receiving Party’s legal counsel), or with an order of a court or other governmental or regulatory body having jurisdiction or any other legal requirement or process. Should such disclosure be required, the Receiving Party will notify the Disclosing Party in writing of such requirement (if permitted to do so) so that the Disclosing Party may seek a protective order or injunctive relief at its own cost and expense. In such disclosures, the Receiving Party will only disclose that portion of the Confidential Information that is legally required to be disclosed (as reasonably determined by the Receiving Party’s legal counsel)."
    },
    {
      "type": "h2",
      "id": "intellectual-property-and-content",
      "text": "Intellectual Property and Content"
    },
    {
      "type": "p",
      "text": "Our data providers, our licensors, and Knabble, Inc. own and will retain all right, title and interest in and to Reflexivity, Content and all intellectual property rights therein. Customer acknowledges and agrees that Customer shall not obtain or claim any ownership interest in Reflexivity or Content, or any portion thereof, or any intellectual property rights therein, including without limitation, analytics software, graphical user interfaces, interactive publications (including without limitation any content or periodicals subscribed to that may be delivered to the Customer via email or a channel outside of the Reflexivity dashboard); and proprietary data including but not limited to data in databases accessible through the Services. Reflexivity, Content, and any customization, modification, releases and additional optional modules developed and provided by us, shall be and remain our property and that of our applicable third party data providers and licensors, subject to the limited license and use set forth in the RSA. Customer agrees and acknowledges that Reflexivity Content contains our (and our licensors’) valuable trade secrets and proprietary information. We may ensure compliance with this RSA as well as the security of Reflexivity and its customers’ accounts by monitoring usage of Reflexivity. Any information retained by us from such monitoring will be aggregated, redacted, and anonymized such that it does not identify any customer or any of its clients."
    },
    {
      "type": "h2",
      "id": "governing-law",
      "text": "Governing Law"
    },
    {
      "type": "p",
      "text": "This RSA shall be governed by and construed in accordance with the laws of the State of New York and the Parties hereby waive any principle of conflict or choice of laws that would cause the application of the laws of any other jurisdiction. Any legal action brought in relation to this RSA shall be brought in a Federal or State court located in New York County, New York State. At any time, a Party may seek preliminary, interim or conservatory measures from a court. The Parties agree that in the case of an alleged breach of Section 5 (License and Use Restrictions) or Section 8 (Confidentiality Obligations), a Party may seek to prevent further unauthorized disclosure of Confidential Information or misuse of Services by seeking a temporary injunction or temporary order of specific performance (each an “Order”), and in seeking such Orders, is not required to prove actual damages or post a bond. In any legal action before a court between the Parties, each Party agrees not to object to a request for a court order requiring that the Parties not disclose any part of such legal action to the public while such action is pending."
    },
    {
      "type": "h2",
      "id": "disputes",
      "text": "Disputes"
    },
    {
      "type": "p",
      "text": "For any dispute, controversy or claim between the Parties arising out of or relating to this RSA (“Claims”), the Parties will use good faith efforts to resolve any issues by informal means prior to initiating litigation, and agree to treat any such disputes as confidential discussions between the Parties."
    },
    {
      "type": "h2",
      "id": "termination",
      "text": "Termination"
    },
    {
      "type": "ul",
      "items": [
        "Either Party may terminate this RSA upon prior written notice to the other Party if a Party breaches any covenant, obligation, representation or warranty in this RSA and fails to cure such breach, if curable, within ten (10) business days after written notice thereof from the non-breaching Party.",
        "Your subscription to Reflexivity renews automatically on an annual basis. You must provide (60) days’ advance notice prior to a renewal term, if you wish not to renew your subscription.",
        "Sections 5 through 14, as well as any Section that would normally survive termination shall survive termination of this RSA."
      ]
    },
    {
      "type": "h2",
      "id": "disclaimers-data-provider-notices-liability-and-indemnificat",
      "text": "Disclaimers, Data Provider Notices, Liability and Indemnification"
    },
    {
      "type": "h3",
      "id": "disclaimers",
      "text": "Disclaimers"
    },
    {
      "type": "p",
      "text": "Although we obtain information for inclusion in the Services that we consider reliable, the information and Services are provided to Customer “as is” and neither we nor any of our affiliates, nor any of their information providers or any third party involved in providing information delivered by the Services makes any representation or warranty of any kind with respect to the timeliness thereof, the results to be obtained by the use thereof, or any other matter related thereto. We expressly disclaim, and Customer waives, any and all implied warranties, including without limitation, warranties of originality, accuracy, completeness, timeliness, merchantability, non-infringement and fitness for a particular purpose. The Services allow users, like Customer’s Authorized Users, to conduct analysis and research of financial markets. We are not an investment adviser or broker dealer, and the Services are not investment advice. Customer acknowledges that it is solely responsible for all financial and other decisions made by Customer and its clients based on any Customer Output or use of the Services."
    },
    {
      "type": "p",
      "text": "The information provided by Alfred is not “investment advice” and should not be treated as such for several key reasons, and it’s crucial to understand these distinctions:"
    },
    {
      "type": "ul",
      "items": [
        "Alfred is an AI, Not a Financial Advisor: Alfred is an artificial intelligence, a large language model. Alfred is not a licensed financial professional, nor does Alfred have the certifications, training, or regulatory oversight to provide financial advice. Investment advice requires a human professional who is legally authorized and qualified to do so.",
        "Lack of Personalization: Investment advice is inherently personal. A legitimate financial advisor would: Assess Your Financial Situation: They’d understand your income, expenses, assets, liabilities, and overall net worth. Determine Your Risk Tolerance: They’d ascertain how much risk you’re comfortable taking with your money and assets. Define Your Investment Goals: Are you saving for retirement, a down payment on a house, your child’s education, or something else? What’s your time horizon? What’s your overall personal financial situation? Consider Your Existing Portfolio: They’d look at what you already own and how new investments would fit into or diversify your current holdings and assets. Understand Your Tax Situation: Investment decisions can have significant tax implications, which an advisor would consider and build into a financial plan for you. Assess Your Financial Situation: They’d understand your income, expenses, assets, liabilities, and overall net worth. Determine Your Risk Tolerance: They’d ascertain how much risk you’re comfortable taking with your money and assets. Define Your Investment Goals: Are you saving for retirement, a down payment on a house, your child’s education, or something else? What’s your time horizon? What’s your overall personal financial situation? Consider Your Existing Portfolio: They’d look at what you already own and how new investments would fit into or diversify your current holdings and assets. Understand Your Tax Situation: Investment decisions can have significant tax implications, which an advisor would consider and build into a financial plan for you.",
        "Alfred’s responses do not do any of the personalization items noted above. Alfred provides information based on hypothetical scenarios, not tailored to your specific needs, goals, or risk profile. Alfred’s analysis is based on publicly available information.",
        "General Information vs. Specific Recommendations: Alfred’s response outlines potential beneficiaries and those who might be negatively impacted by a hypothetical market shift. When Alfred mentions industries and types of companies (e.g., “cane sugar producers”, “HFCS producers”, “Archer Daniels Midland”, if you were, for example, asking about cane sugar versus high fructose corn syrup changes to Coca Cola’s US beverage production). This is general market analysis and identification of potential trends. Alfred did not say: “Buy X stock now.” “Sell Y stock now.” “Allocate Z percentage of your portfolio to this sector.” “This is the right investment for you.” “Buy X stock now.” “Sell Y stock now.” “Allocate Z percentage of your portfolio to this sector.” “This is the right investment for you.”",
        "No Fiduciary Duty: A financial advisor typically has a fiduciary duty to act in your best interest. Alfred, as an AI, has no such legal or ethical obligation to you as an individual investor. Alfred’s purpose is to provide information, not to guide your personal financial decisions.",
        "Market Volatility and Unpredictability: Reflexivity’s terms of service, notices, and disclaimers intentionally repeat to you as the end user to always conduct thorough due diligence and consider the broader market trends and any confirmed actions of any company or asset you are researching. Markets are complex and unpredictable. Even if Alfred’s analysis of potential impacts is sound, countless other factors (economic shifts, competitor actions, regulatory changes, consumer trends, etc.) could influence stock prices and investment outcomes. Alfred cannot guarantee any particular outcome."
      ]
    },
    {
      "type": "p",
      "text": "Any decision to invest based on this information (or any information found online) should be made only after consulting with a qualified financial professional and conducting your own extensive research and due diligence."
    },
    {
      "type": "h3",
      "id": "data-provider-notices",
      "text": "Data Provider Notices"
    },
    {
      "type": "ul",
      "items": [
        "Third-party data providers provide data for our products and Services. The data provider notices are applicable to all users of Services (“Data Provider Notices”): https://reflexivity.com/resources/data-attribution",
        "Data Provider Notices may be updated, from time to time, at the sole discretion of the respective third party data providers. When and if updated, we will notify you of any updated Data Provider Notices via email, and such updated Data Provider Notices will be in effect immediately.",
        "We reserve the right to suspend or terminate access to any Authorized User for a violation of a Data Provider Notice that is not cured within five (5) business days. Our failure to learn of a violation will not toll the time allotted for an Authorized User to cure a violation. Customer is responsible for its Authorized Users’ compliance with this Agreement."
      ]
    },
    {
      "type": "h3",
      "id": "liability-limitations",
      "text": "Liability Limitations"
    },
    {
      "type": "p",
      "text": "WE SHALL NOT BE LIABLE TO CUSTOMER FOR (I) INDIRECT, INCIDENTAL, CONSEQUENTIAL, EXEMPLARY, PUNITIVE, OR SPECIAL DAMAGES, OR FOR ANY LOSS OF PROFIT (WHETHER DIRECT, INDIRECT, OR CONSEQUENTIAL) OR (II) FOR AGGREGATE DAMAGES IN EXCESS OF AMOUNTS PAID OR PROPERLY PAYABLE UNDER THIS RSA DURING THE TWELVE-MONTH PERIOD PRIOR TO THE DATE THE CAUSE OF ACTION AROSE, REGARDLESS OF THE FORM OF THE ACTION OR THE THEORY OF RECOVERY, EVEN IF WE WERE ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR DATA SUPPLIERS AND OTHER LICENSORS SHALL NOT BE LIABLE TO CUSTOMER FOR ANY CLAIMS UNDER THIS AGREEMENT."
    },
    {
      "type": "h3",
      "id": "indemnification",
      "text": "Indemnification"
    },
    {
      "type": "p",
      "text": "We will defend, indemnify and hold harmless Customer from and against third party claims that the Services infringe or misappropriate the intellectual property of any third party. Customer agrees to defend, indemnify and hold Knabble, Inc., its affiliates and data suppliers and licensors, and their respective directors, officers, employees and agents, harmless against all third party claims and expenses caused by (i) Customer’s misuse of the Services, or (ii) Customer’s breach of this RSA, excluding any claims that are the subject of our indemnification obligation set forth above. Each Party’s indemnification obligations are subject to (a) the indemnified Party providing prompt notice to the indemnifying Party of the applicable claim with a reasonable opportunity to defend such claim, (b) the indemnified Party providing the indemnifying Party with sole control of the defense and settlement of such claim so long as a settlement does not impose any admissions or liability on the indemnified Party and (c) the indemnified Party providing reasonable cooperation in the defense or settlement of such claims. The indemnified Party may retain its own counsel in connection with any claim indemnified by the other Party, at the indemnified Party’s expense and subject to the indemnifying Party’s control as set forth above."
    },
    {
      "type": "p",
      "text": "By using Reflexivity services, you acknowledge that you have read this important disclosure, and you agree to abide by its terms."
    },
    {
      "type": "h2",
      "id": "successors-and-assigns",
      "text": "Successors and Assigns"
    },
    {
      "type": "p",
      "text": "This RSA shall be binding upon and inure to the benefit of Knabble, Inc. and its respective successors and assigns, including any corporation with which, or into which we may be merged or that may succeed to our assets or business. We may from time to time assign this RSA, to: (i) a wholly-owned subsidiary, or to a parent organization in the event of an internal restructuring; or (ii) an acquirer of all or a substantial portion of its or any of its business or assets."
    },
    {
      "type": "h2",
      "id": "miscellaneous",
      "text": "Miscellaneous"
    },
    {
      "type": "h3",
      "id": "severability",
      "text": "Severability"
    },
    {
      "type": "p",
      "text": "In case any provision of this RSA shall be invalid, illegal or otherwise unenforceable, it shall be considered deleted, and the validity, legality and enforceability of the remaining provisions shall in no way be affected or impaired thereby."
    },
    {
      "type": "h3",
      "id": "waivers",
      "text": "Waivers"
    },
    {
      "type": "p",
      "text": "No delay or omission by a Party in exercising any right under this RSA will operate as a waiver of that or any other right. A waiver or consent given by a Party on any one occasion is effective only in that instance and will not be construed as a bar to or waiver of any right on any other occasion."
    },
    {
      "type": "h3",
      "id": "captions",
      "text": "Captions"
    },
    {
      "type": "p",
      "text": "The captions of the Sections of this RSA are for convenience of reference only and in no way define, limit or affect the scope or substance of any Section of this RSA."
    },
    {
      "type": "h3",
      "id": "force-majeure",
      "text": "Force Majeure"
    },
    {
      "type": "p",
      "text": "Neither Party shall be responsible for any delay or failure in performance of its obligations under this RSA resulting from acts beyond their control, including but not limited to, any act of God, act of governmental authority, act of public enemy, act of terrorism, computer or system failure, or due to war, riot, fire, flood, civil commotion, insurrection, labor difficulty (including, without limitation any strike, or other work stoppage or slowdown), or severe or adverse weather conditions; provided, however, that failure of Customer to pay fees shall not be subject to any exception under this Section."
    },
    {
      "type": "h3",
      "id": "customer-attestation",
      "text": "Customer Attestation"
    },
    {
      "type": "p",
      "text": "Customer agrees they are not accessing Reflexivity with the purpose of creating a competing platform or product to Reflexivity. Customer will not allow multiple people to access Reflexivity using the same Authorized User’s credentials. An Authorized User will not be tasked as a help desk, resource desk, or Reflexivity access source for anyone within the Customer’s organization, and use of Reflexivity by an Authorized User is for such Authorized User’s internal business purposes only. Authorized Users may share or incorporate part of the content generated via use of the Services with their clients as part of their standard business process with such Client; provided, however, that such content is not shared as a feed, newsletter, passthrough, or any other manner that essentially provides access to the Services that would be indistinguishable from such client being the Authorized User."
    },
    {
      "type": "h3",
      "id": "branding-and-sharing-content",
      "text": "Branding and Sharing Content"
    },
    {
      "type": "p",
      "text": "You may not use our logos or branding in any promotional materials or any materials whatsoever without prior written consent from our legal department, which you may contact via legal@reflexivity.com. Your use of Reflexivity or any Services are not an endorsement of any kind whatsoever of anything you do with Content, or any information you present or show to any third party. Authorized Users may, on an occasional and irregular basis, disseminate an insubstantial portion of content from a Service, for a research purpose, without charge, and transmitted in non-electronic form, to a small number of individuals, provided such shared content includes all copyright and other proprietary rights notices that originally appeared with such portion of the content in the same form in which they appeared on the Service, and the phrase “Used with permission from Reflexivity.com.” Content may not be posted on any newsgroups, mailing lists or electronic bulletin boards without our prior written consent."
    },
    {
      "type": "h3",
      "id": "notices",
      "text": "Notices"
    },
    {
      "type": "p",
      "text": "Notices required under this RSA shall be in writing and delivered via electronic mail, with a hard copy delivered personally, via first-class post or equivalent next-business-day service should such notice relate to a claim of breach or litigation. Day to day communications and interactions between the Parties or with Authorized Users shall be guided by any method of communication available through Reflexivity, including technical support."
    },
    {
      "type": "p",
      "text": "If to us, notices shall be delivered to:"
    },
    {
      "type": "p",
      "text": "ATTN: Legal Department Via email to: legal@reflexivity.com Via post to: 589 5th Avenue, Ste 606A, New York, NY 10017"
    },
    {
      "type": "p",
      "text": "If to Customer, notices shall be delivered to the email address the Customer used to subscribe."
    },
    {
      "type": "h3",
      "id": "entire-agreement-amendment",
      "text": "Entire Agreement; Amendment"
    },
    {
      "type": "p",
      "text": "This RSA supersedes all prior agreements, written or oral, between the Parties relating to the subject matter of this RSA. We may update the terms in this RSA to (i) reflect changes in our Services, Content, how we do business (for example, when we add or remove services, features, technologies, data partners, update pricing, security, or legal or regulatory requirements), or (ii) in urgent situations such as preventing abuse, misuse, or in response to legal requirements or orders of court. We will provide you with reasonable advance notice of any material changes to the terms of the RSA, and you agree to any such changes by continuing to use Reflexivity."
    },
    {
      "type": "p",
      "text": "Copyright © 2026 Knabble, Inc., all rights reserved."
    }
  ]
};
