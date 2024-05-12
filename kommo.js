/*const axios = require('axios');
require('dotenv').config();

async function registerIntegrationAndRequestAccessToken(integrationDetails) {
    // Obtener los detalles de la integración
    const { name, description, redirectUrl, permissions } = integrationDetails;

    // Obtener las credenciales de la cuenta de Kommo desde el archivo .env
    const apiKey = process.env.KOMMO_API_KEY;
    const accountId = process.env.KOMMO_ACCOUNT_ID;

    // Construir la URL de la solicitud de registro de la integración
    const integrationUrl = `https://devteam.kommo.com/${accountId}/v4/integrations`;

    // Configurar los datos para la solicitud de acceso
    const accessData = {
        client_id: 'xxxx',
        client_secret: 'xxxx',
        grant_type: 'authorization_code',
        code: 'xxxxxx',
        redirect_uri: 'https://test.com/',
    };

    try {
        // Realizar la solicitud POST para registrar la integración
        const integrationResponse = await axios.post(integrationUrl, {
            name: name,
            description: description,
            redirectUrl: redirectUrl,
            permissions: permissions
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        // Verificar si la integración se registró correctamente
        if (integrationResponse.status !== 201) {
            throw new Error(`Error al registrar la integración (${integrationResponse.status}): ${integrationResponse.data}`);
        }

        // Parsear la respuesta JSON de la integración
        const integrationData = integrationResponse.data;

        // Realizar la solicitud POST para obtener el token de acceso
        const accessUrl = `https://test.kommo.com/oauth2/access_token`;
        const accessResponse = await axios.post(accessUrl, accessData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Verificar si se obtuvo el token de acceso correctamente
        if (accessResponse.status !== 200) {
            throw new Error(`Error al obtener el token de acceso (${accessResponse.status}): ${accessResponse.data}`);
        }

        // Parsear la respuesta JSON del token de acceso
        const accessTokenData = accessResponse.data;

        return {
            integration: integrationData,
            accessToken: accessTokenData.access_token
        };
    } catch (error) {
        throw new Error(`Error durante el registro de la integración y/o solicitud del token de acceso: ${error.message}`);
    }
}

// Ejemplo de uso de la función registerIntegrationAndRequestAccessToken
const integrationDetails = {
    name: "prueba",
    description: "prueba",
    redirectUrl: "https://webhook.com",
    permissions: ["read_data", "write_data"]
};

registerIntegrationAndRequestAccessToken(integrationDetails)
    .then(result => {
        console.log("Integración registrada exitosamente:", result.integration);
        console.log("Token de acceso:", result.accessToken);
    })
    .catch(error => {
        console.error("Error:", error.message);
    });*/
