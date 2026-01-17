const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function loginRequest(accUserName: string, accPass: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
   
    credentials: "include",
    body: JSON.stringify({ accUserName, accPass }),
  });

  const text = await res.text(); 
  if (!res.ok) throw new Error(text || "Login failed");
  return text;
}

export type SignupRequestBody = {
  accName: string | null;            
  accUserName: string;
  accPass: string;
  accPresentation: string | null;    
  accLink: string;            
  imgID: string | null;              
};

export async function signupRequest(body: SignupRequestBody): Promise<string> {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text || "Signup failed");
<<<<<<< HEAD
  return text; // "Signup successful"
=======
  return text;
>>>>>>> origin/frontend3
}

export async function detectIngredients(imageUri: string) {
  const formData = new FormData();

  formData.append("file", {
    uri: imageUri,
    name: "ingredients.jpg",
    type: "image/jpeg",
  } as any);

  const res = await fetch(`${API_URL}/detection/ingredients`, {
    method: "POST",
    body: formData,
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(text || "Detection failed");
  }

  return JSON.parse(text);
}



