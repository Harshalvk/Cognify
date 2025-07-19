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

interface VerifyEmailAddressProps {
  firstName: string;
  verificationUrl: string;
}

const CognifyVerificationEmail = (props: VerifyEmailAddressProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            <Section className="text-center mb-[32px]">
              <Text className="text-[32px] font-bold text-gray-900 m-0">
                Cognify
              </Text>
              <Text className="text-[16px] text-gray-600 mt-[8px] mb-0">
                Verify your email address
              </Text>
            </Section>

            <Section className="mb-[32px]">
              <Text className="text-[18px] font-semibold text-gray-900 mb-[16px]">
                Hello {props.firstName}!
              </Text>

              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                Welcome to Cognify! We&apos;re excited to have you on board. To
                get started and secure your account, please verify your email
                address by clicking the button below.
              </Text>

              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                This verification link will expire in 1 hour for your security.
              </Text>

              <Section className="text-center mb-[24px]">
                <Button
                  href={props.verificationUrl}
                  className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[16px]">
                If the button above doesn&apos;t work, you can copy and paste
                this link into your browser:
              </Text>

              <Text className="text-[14px] text-blue-600 break-all mb-[24px]">
                {props.verificationUrl}
              </Text>

              <Text className="text-[14px] text-gray-600 leading-[20px]">
                If you didn&apos;t create an account with Cognify, you can
                safely ignore this email.
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[32px]" />

            <Section className="text-center">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                © {new Date().getFullYear()} Cognify. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default CognifyVerificationEmail;
