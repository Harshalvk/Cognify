import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
} from "@react-email/components";

interface ForgotPasswordEmailProps {
  username: string;
  userEmail: string;
  resetUrl: string;
}

const ForgotPasswordEmail = (props: ForgotPasswordEmailProps) => {
  const { username, userEmail, resetUrl } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] p-[32px] max-w-[600px] mx-auto">
            <Section className="text-center mb-[32px]">
              <Text className="text-[24px] font-bold text-gray-900 m-0">
                Cognify
              </Text>
            </Section>

            <Section>
              <Text className="text-[18px] font-semibold text-gray-900 mb-[16px]">
                Reset your password
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                Hello {username}, <br />
                We received a request to reset the password for your Cognify
                account associated with {userEmail}.
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[32px] leading-[24px]">
                Click the button below to create a new password:
              </Text>

              <Section className="text-center mb-[32px]">
                <Button
                  href={resetUrl}
                  className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-medium no-underline box-border"
                >
                  Reset Password
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-[24px] leading-[20px]">
                This link will expire in 1 hours for security reasons.
              </Text>

              <Text className="text-[14px] text-gray-600 mb-[24px] leading-[20px]">
                If you didn&apos;t request a password reset, you can safely
                ignore this email. Your password will remain unchanged.
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[32px]" />

            <Section>
              <Text className="text-[12px] text-gray-500 text-center m-0">
                © 2025 Cognify. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ForgotPasswordEmail;
