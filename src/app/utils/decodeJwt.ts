export default function decodeJWT(token: string | null) {
    try {
      // Split the token into parts
      const parts = token?.split('.');
      if (parts?.length !== 3) {
        throw new Error('Invalid JWT format');
      }
  
      // Decode the payload (part 1 is header, part 2 is payload)
      const payload = parts[1];
      
      // Base64Url decode + convert to JSON
      const decoded = Buffer.from(payload, 'base64url').toString('utf-8');
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Failed to decode JWT:', error);
      return null;
    }
  }
  
 