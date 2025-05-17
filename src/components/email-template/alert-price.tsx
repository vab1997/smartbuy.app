import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

interface PriceAlertEmailProps {
  userName?: string;
  productName: string;
  productImage: string;
  productUrl: string;
  originalPrice?: string;
  currentPrice?: string;
  isPriceAlert: boolean;
  isStockAlert: boolean;
  storeName?: string;
  discount?: number;
  stock?: string;
}

export const PriceAlertEmail = ({
  userName,
  productName,
  productImage,
  productUrl,
  originalPrice,
  currentPrice,
  isPriceAlert,
  isStockAlert,
  discount,
  stock,
}: PriceAlertEmailProps) => {
  const previewText = isPriceAlert
    ? `¡Buenas noticias! El precio de ${productName} ha bajado a ${currentPrice}`
    : `¡${productName} ya está disponible en stock!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={{ fontSize: '50px', fontWeight: 'bold' }}>
              SmartBuy
            </Text>
          </Section>

          <Section style={heroSection}>
            <Heading style={heading}>
              {isPriceAlert ? '¡BAJÓ DE PRECIO!' : '¡YA ESTÁ DISPONIBLE!'}
            </Heading>

            <Text style={subheading}>
              {userName}, tenemos buenas noticias para ti
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Product Information */}
          <Section style={productSection}>
            <Row>
              <Column style={imageColumn}>
                <Img
                  src={productImage}
                  width="250"
                  height="250"
                  alt={productName}
                  style={productImageStyle}
                />
              </Column>

              <Column style={contentColumn}>
                <Text style={productNameStyle}>{productName}</Text>
                <Section>
                  <Text style={priceText}>
                    Precio anterior:{' '}
                    <span style={oldPrice}>${originalPrice}</span>
                  </Text>
                  <Text style={newPriceText}>
                    Nuevo precio: <span style={newPrice}>${currentPrice}</span>
                  </Text>
                  {originalPrice !== currentPrice && (
                    <Text style={savingsText}>
                      ¡Ahorras{' '}
                      {calculateSavings(
                        originalPrice as string,
                        currentPrice as string
                      )}
                    </Text>
                  )}
                  {stock && (
                    <Text style={stockText}>
                      Stock: <span style={stockText}>{stock}</span>
                    </Text>
                  )}
                </Section>

                {isStockAlert && (
                  <Section>
                    <Text style={stockText}>
                      El producto que estabas esperando ya está disponible para
                      comprar.
                    </Text>
                    <Text style={stockWarningText}>
                      ¡No esperes demasiado! La disponibilidad puede ser
                      limitada.
                    </Text>
                  </Section>
                )}

                <Button href={productUrl} style={button}>
                  {isPriceAlert ? 'Aprovechar oferta' : 'Comprar ahora'}
                </Button>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Este email fue enviado a ti porque te suscribiste a alertas de{' '}
              SmartBuy.
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} SmartBuy.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Helper function to calculate savings
function calculateSavings(originalPrice: string, currentPrice: string): string {
  // Remove dots (thousand separators) and replace comma with dot for decimal point
  const cleanPrice = (price: string) => {
    return price.replace(/\./g, '').replace(',', '.');
  };

  const original = Number.parseFloat(cleanPrice(originalPrice));
  const current = Number.parseFloat(cleanPrice(currentPrice));

  if (isNaN(original) || isNaN(current)) {
    return '';
  }

  const savings = original - current;
  const percentSavings = (savings / original) * 100;

  return `$${savings.toFixed(0)} (${percentSavings.toFixed(0)}%)`;
}

export default PriceAlertEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0',
  maxWidth: '600px',
};

const header = {
  padding: '20px',
  backgroundColor: '#ffffff',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  textAlign: 'center' as const,
  borderBottom: '1px solid #eaeaea',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const heroSection = {
  padding: '30px 20px',
  backgroundColor: '#ffffff',
  textAlign: 'center' as const,
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#000',
  margin: '0 0 10px',
};

const subheading = {
  fontSize: '18px',
  color: '#333333',
  margin: '0',
};

const divider = {
  borderColor: '#eaeaea',
  margin: '0',
};

const productSection = {
  padding: '30px 20px',
  backgroundColor: '#ffffff',
};

const imageColumn = {
  width: '40%',
  padding: '0 10px',
  textAlign: 'start' as const,
};

const contentColumn = {
  width: '60%',
  padding: '0 10px',
};

const productImageStyle = {
  borderRadius: '8px',
  border: '1px solid #eaeaea',
};

const productNameStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#333333',
  margin: '0 0 15px',
};

const priceText = {
  fontSize: '14px',
  color: '#666666',
  margin: '0 0 5px',
};

const oldPrice = {
  textDecoration: 'line-through',
  color: '#999999',
};

const newPriceText = {
  fontSize: '16px',
  color: '#333333',
  margin: '0 0 5px',
};

const newPrice = {
  fontWeight: 'bold',
  color: '#000',
  fontSize: '20px',
};

const savingsText = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#4CAF50',
  margin: '0 0 20px',
};

const stockText = {
  fontSize: '16px',
  color: '#333333',
  margin: '0 0 10px',
};

const stockWarningText = {
  fontSize: '14px',
  color: '#FF9800',
  fontStyle: 'italic',
  margin: '0 0 20px',
};

const button = {
  backgroundColor: '#000',
  borderRadius: '4px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 20px',
};

const footer = {
  padding: '20px',
  backgroundColor: '#ffffff',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
  borderTop: '1px solid #eaeaea',
};

const footerText = {
  fontSize: '12px',
  color: '#666666',
  margin: '0 0 10px',
  textAlign: 'center' as const,
};
