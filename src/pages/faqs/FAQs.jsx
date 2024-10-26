import { Accordion } from "flowbite-react";

const FAQs = () => {
  return (
    <div className="md:mx-20 md:my-20 my-10">
      <h2 className="text-3xl md:text-5xl font-bold text-[#28A745]  text-center mb-10">
        Frequently Asked Questions (FAQs)
      </h2>
      <Accordion collapseAll>
        <Accordion.Panel>  
          <Accordion.Title className="text-green-500 hover:text-green-700">What types of products do you offer?</Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-green-500 hover:text-green-700">
              We offer a wide range of medical and surgical products, including prescription medicines, over-the-counter drugs, medical devices, and health supplements. Our product categories include capsules, tablets, injections, syrups, and surgical instruments, all sourced from reputable manufacturers.
            </p>
          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title className="text-green-500 hover:text-green-700">How can I place an order?</Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-green-500">
              To place an order, simply browse our products, add the items to your cart, and proceed to checkout. You can create an account for a faster checkout experience or continue as a guest. We offer various payment methods for your convenience.
            </p>
          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title className="text-green-500 hover:text-green-700">Do you offer discounts on medicines?</Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-green-500 dark:text-gray-400">
              Yes, we offer discounts on selected products. You can find details about discounts in the product descriptions. The discount type and value may vary depending on the product and manufacturer. For example, some items have percentage-based discounts, while others may offer flat rate reductions.
            </p>
          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title className="text-green-500 hover:text-green-700">Are your products genuine and safe?</Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-green-500 dark:text-gray-400">
              Yes, all our products are 100% genuine and sourced directly from certified manufacturers and distributors. We ensure that all products meet the highest safety standards and are approved for medical use. Our medicines are stored under controlled conditions to preserve their efficacy.
            </p>
          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title className="text-green-500 hover:text-green-700">How long will it take to receive my order?</Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-green-500 dark:text-gray-400">
              Delivery times vary depending on your location and the shipping method selected at checkout. Typically, orders are processed within 1-2 business days, and standard delivery can take 3-5 business days. Expedited shipping options are also available.
            </p>
          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title className="text-green-500 hover:text-green-700">Can I return or exchange my order?</Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-green-500 dark:text-gray-400">
              Due to the nature of medical products, we only accept returns or exchanges for products that are defective, damaged, or incorrectly supplied. Please contact our customer service team within 7 days of receiving your order to initiate a return or exchange.
            </p>
          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title className="text-green-500 hover:text-green-700">Do you offer prescription medicines?</Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-green-500 dark:text-gray-400">
              Yes, we offer a variety of prescription medicines. To purchase prescription drugs, you must provide a valid prescription from a licensed healthcare provider. You can upload the prescription during checkout, or email it to our support team after placing the order.
            </p>
          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title className="text-green-500 hover:text-green-700">What payment methods do you accept?</Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-green-500 dark:text-gray-400">
              We accept a wide range of payment methods including credit/debit cards, PayPal, and bank transfers. All transactions are secured with encryption technology to ensure the safety of your payment details.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
};

export default FAQs;
