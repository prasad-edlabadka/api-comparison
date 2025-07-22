import React, { useMemo, useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text } from './Themed';
import { InterfaceMatchTable } from './InterfaceMatchTable';
import { InterfaceMatch, MatchClassification } from '../types/InterfaceMatch';

const matchClassifications: MatchClassification[] = [
  'fully matched',
  'partial match',
  'no match',
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateTestData(count: number): InterfaceMatch[] {
  const javaNames = ['UserService', 'OrderService', 'PaymentService', 'InventoryService', 'ShippingService', 'NotificationService', 'AuthService', 'ProductService', 'CartService', 'ReviewService'];
  const oasNames = ['user-api.yaml', 'order-api.yaml', 'payment-api.yaml', 'inventory-api.yaml', 'shipping-api.yaml', 'notification-api.yaml', 'auth-api.yaml', 'product-api.yaml', 'cart-api.yaml', 'review-api.yaml'];
  const javaSummaries = [
    'Handles user-related operations, including registration, authentication, profile management, password resets, and user preferences. This service is responsible for ensuring data integrity and security across all user-facing endpoints, and integrates with external identity providers for SSO and OAuth2 flows.',
    'Processes orders and manages order lifecycle, including order creation, validation, payment processing, shipment tracking, returns, and refunds. The service coordinates with inventory, payment, and shipping microservices to ensure seamless order fulfillment and customer satisfaction.',
    'Manages payment transactions and gateways, supporting multiple payment providers, fraud detection, transaction logging, and reconciliation. It handles complex payment flows such as split payments, recurring billing, and refunds, ensuring PCI compliance and secure data handling.',
    'Tracks inventory levels and stock movements, including real-time updates from warehouses, low-stock alerts, automated reordering, and inventory audits. The service provides APIs for inventory queries, batch updates, and integration with third-party logistics providers.',
    'Coordinates shipping and delivery, calculating shipping rates, generating shipping labels, tracking packages, and managing delivery exceptions. It integrates with multiple carriers and supports international shipping, customs documentation, and delivery notifications.',
    'Sends notifications to users via email, SMS, and push notifications, supporting templated messages, localization, delivery tracking, and user notification preferences. The service ensures reliable delivery and logs all notification events for auditing.',
    'Handles authentication and authorization, including JWT token issuance, session management, role-based access control, and integration with external identity providers. It enforces security policies and monitors for suspicious login activity.',
    'Manages product catalog and details, including product creation, categorization, pricing, inventory linkage, and rich media support. The service provides advanced search, filtering, and product recommendation APIs.',
    'Handles shopping cart operations, supporting guest and authenticated carts, real-time price calculations, promotions, and cart persistence across devices. It ensures data consistency and integrates with checkout and payment services.',
    'Manages user reviews and ratings, including moderation, spam detection, review analytics, and integration with product and user profiles. The service supports review replies, upvotes, and reporting of inappropriate content.'
  ];
  const oasSummaries = [
    'OpenAPI spec for user microservice. This specification defines all endpoints related to user management, including detailed request and response schemas, authentication requirements, error codes, and example payloads. It also documents rate limits, security schemes, and integration notes for client developers.',
    'OpenAPI spec for order microservice. The spec covers order creation, status updates, payment integration, shipment tracking, and return processing. It includes comprehensive examples, error handling strategies, and links to related microservices for a complete order workflow.',
    'OpenAPI spec for payment microservice. This document details endpoints for payment initiation, status queries, refunds, and provider integrations. It includes security considerations, webhook event formats, and best practices for handling asynchronous payment flows.',
    'OpenAPI spec for inventory microservice. The spec describes inventory queries, stock updates, batch operations, and integration points with warehouse management systems. It provides detailed schemas, validation rules, and usage examples for all endpoints.',
    'OpenAPI spec for shipping microservice. This specification outlines endpoints for rate calculation, label generation, tracking, and delivery confirmation. It covers carrier integrations, error handling, and international shipping requirements.',
    'OpenAPI spec for notification microservice. The document defines APIs for sending, scheduling, and tracking notifications across multiple channels. It includes message templates, localization support, and delivery status webhooks.',
    'OpenAPI spec for auth microservice. The spec details authentication flows, token management, user roles, and security event logging. It provides guidance on integrating with external identity providers and enforcing access policies.',
    'OpenAPI spec for product microservice. This specification covers product creation, updates, search, categorization, and media management. It includes advanced filtering, sorting, and recommendation endpoints.',
    'OpenAPI spec for cart microservice. The document describes cart creation, item management, price calculation, and promotion application. It provides examples for both guest and authenticated user flows.',
    'OpenAPI spec for review microservice. The spec details endpoints for submitting, moderating, and retrieving reviews, as well as analytics and reporting features. It includes moderation workflows and integration with product and user services.'
  ];
  const data: InterfaceMatch[] = [];
  for (let i = 0; i < count; i++) {
    const idx = getRandomInt(0, 9);
    const matchClassification = matchClassifications[getRandomInt(0, 2)];
    let matchPercentage = 0;
    if (matchClassification === 'fully matched') matchPercentage = 100;
    else if (matchClassification === 'partial match') matchPercentage = getRandomInt(30, 99);
    else matchPercentage = getRandomInt(0, 29);
    data.push({
      _id: (i + 1).toString(),
      javaClassFilename: `${javaNames[idx]}.java`,
      javaInterfaceName: javaNames[idx],
      javaClassSummary: javaSummaries[idx],
      oasFilename: oasNames[idx],
      oasSummary: oasSummaries[idx],
      matchClassification,
      matchPercentage,
    });
  }
  return data;
}

export default function InterfaceMatchScreen() {
  const [data, setData] = useState<InterfaceMatch[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8080/api/matches')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(setData)
      .catch(e => {
        setError(e.message);
        setData(generateTestData(100));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={{ color: 'red', margin: 16, fontFamily: 'Effra' }}>Error: {error}</Text>
      ) : null}
      {data && <InterfaceMatchTable data={data} />}
    </View>
  );
}
