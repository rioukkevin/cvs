import "server-only";
import type { CvData } from "@/lib/cv";

type GitHubContentResponse = {
  sha: string;
};

type GitHubPutResponse = {
  commit: {
    sha: string;
  };
};

const TARGET_PATH = "data/cv.json";

export async function commitCv(
  content: CvData
): Promise<{ commitSha: string }> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH ?? "master";

  if (!token || !owner || !repo) {
    throw new Error(
      "GitHub configuration missing: GITHUB_TOKEN, GITHUB_OWNER and GITHUB_REPO are required"
    );
  }

  const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${TARGET_PATH}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // Step 1: get existing file sha
  const getRes = await fetch(`${baseUrl}?ref=${encodeURIComponent(branch)}`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  if (!getRes.ok) {
    const body = await getRes.text();
    throw new Error(`GitHub get failed: ${getRes.status} ${body}`);
  }

  const getJson = (await getRes.json()) as GitHubContentResponse;
  const existingSha = getJson.sha;

  // Step 2: PUT new contents
  const jsonString = JSON.stringify(content, null, 2) + "\n";
  const base64Content = Buffer.from(jsonString, "utf8").toString("base64");

  const putRes = await fetch(baseUrl, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "chore(cv): edit via UI",
      content: base64Content,
      sha: existingSha,
      branch,
    }),
    cache: "no-store",
  });

  if (!putRes.ok) {
    const body = await putRes.text();
    throw new Error(`GitHub put failed: ${putRes.status} ${body}`);
  }

  const putJson = (await putRes.json()) as GitHubPutResponse;
  return { commitSha: putJson.commit.sha };
}
