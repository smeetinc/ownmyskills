/* // app/api/w3up-delegation/[did]/route.ts
import { NextRequest, NextResponse } from "next/server";

// You'll need to set this up as an environment variable
const STORACHA_EMAIL = process.env.STORACHA_EMAIL;

// Store the server client globally (in production, use a proper database)
let serverClient: any = null;

async function initializeServerClient() {
  if (serverClient) {
    return serverClient;
  }

  if (!STORACHA_EMAIL) {
    throw new Error("STORACHA_EMAIL environment variable is required");
  }

  try {
    // Dynamically import the client to avoid build-time issues
    const Client = await import("@storacha/client");

    // Create server client
    serverClient = await Client.create();
    console.log("Server client created with DID:", serverClient.agent.did());

    // Login with email
    await serverClient.login(STORACHA_EMAIL);
    console.log("Login initiated for:", STORACHA_EMAIL);

    // Get or create a space
    const spaces = await serverClient.spaces();
    let space;

    if (spaces.length > 0) {
      space = spaces[0];
      console.log("Using existing space:", space.did());
    } else {
      // Create a new space
      space = await serverClient.createSpace("server-delegation-space");
      console.log("Created new space:", space.did());
    }

    // Set current space
    await serverClient.setCurrentSpace(space.did());

    return serverClient;
  } catch (error) {
    console.error("Failed to initialize server client:", error);
    throw error;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ did: string }> }
) {
  try {
    const resolvedParams = await params;
    const clientDid = resolvedParams.did;

    if (!clientDid) {
      return NextResponse.json(
        { error: "Client DID is required" },
        { status: 400 }
      );
    }

    console.log("Creating delegation for client DID:", clientDid);

    // Initialize server client if not already done
    const client = await initializeServerClient();

    // Get current space
    const space = client.currentSpace();
    if (!space) {
      throw new Error("No space available for delegation");
    }

    console.log("Using space:", space.did());

    // Create delegation for the client
    const delegation = await client.createDelegation(
      clientDid,
      ["store/add", "upload/add"],
      {
        // Set expiration to 24 hours from now
        expiration: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      }
    );

    console.log("Delegation created successfully");

    // Serialize the delegation to CAR format
    const delegationBytes = delegation.export();

    return new NextResponse(delegationBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.ipld.car",
        "Content-Disposition": 'attachment; filename="delegation.car"',
      },
    });
  } catch (error) {
    console.error("Delegation creation failed:", error);
    return NextResponse.json(
      {
        error: "Failed to create delegation",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function POST(request: NextRequest) {
  try {
    // This endpoint can be used to initialize the server client
    // or check if everything is set up correctly
    const client = await initializeServerClient();
    const space = client.currentSpace();

    return NextResponse.json({
      success: true,
      message: "Server client initialized",
      spaceDid: space?.did() || "No space set",
      agentDid: client.agent.did(),
      spaces: (await client.spaces()).length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Server initialization failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
 */
