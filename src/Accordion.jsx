import { Accordion, AccordionSummary, AccordionDetails, Typography, Container, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function FAQSection() {
  return (
    <Container sx={{width : "95%"}}>
 

   

      {/* Question 1 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Why choose PassProtekt?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            PassProtekt stands out as a robust password security solution due to its AI-driven real-time password 
            strength evaluation, ensuring only strong passwords are accepted. Unlike traditional password checkers, 
            it integrates multiple machine learning models (Decision Tree, Logistic Regression, ANN, and Random Forest) 
            to accurately assess password security. Additionally, PassProtekt securely stores passwords using advanced 
            encryption and restricts unauthorized access, making it an ideal choice for enhancing cybersecurity in 
            various applications, including ride-sharing, banking, and e-commerce platforms.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Question 2 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            General Awareness: How Should a Password Be for PassProtekt?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To ensure maximum security, passwords created for PassProtekt should meet the following criteria:
            <ul>
              <li><strong>✅ Length & Complexity</strong> – A strong password should be at least 12–16 characters long, combining uppercase and lowercase letters, numbers, and special characters (e.g., @, #, $).</li>
              <li><strong>✅ Avoid Common Passwords</strong> – Do not use easily guessable passwords like "123456," "password," or "qwerty."</li>
              <li><strong>✅ Uniqueness</strong> – Use a different password for each account to prevent credential stuffing attacks.</li>
              <li><strong>✅ Passphrase Approach</strong> – Consider using a random phrase (e.g., "Purple$Tiger!Climbs98") to make it strong and memorable.</li>
              <li><strong>✅ Regular Updates</strong> – Change passwords periodically to reduce the risk of compromised credentials.</li>
            </ul>
            With PassProtekt’s AI-driven password strength analysis, users receive real-time feedback to ensure their 
            password meets security standards before account creation, enhancing overall cybersecurity.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Question 3 */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            Why is PassProtekt important for ride-sharing apps like Uber?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            PassProtekt is crucial for ride-sharing apps like Uber because these platforms store sensitive user data, 
            including payment details, personal information, and ride history. Weak passwords increase the risk of 
            account takeovers, leading to identity theft and unauthorized access. By enforcing strong password policies, 
            real-time strength evaluation, and AI-driven security checks, PassProtekt helps mitigate brute-force and 
            credential-stuffing attacks, ensuring safer user accounts and reducing the risk of fraudulent activities.
          </Typography>
        </AccordionDetails>
      </Accordion>
 
    </Container>
  );
}

export default FAQSection;
