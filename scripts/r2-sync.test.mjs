import assert from "node:assert/strict"
import test from "node:test"
import { signRequest } from "./r2-sync.mjs"

// AWS SigV4 "GET Object" example from the Signature Version 4 test suite.
// If this fails, every R2 request will come back 403 SignatureDoesNotMatch.
const AWS_EXAMPLE = {
  accessKeyId: "AKIAIOSFODNN7EXAMPLE",
  secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  region: "us-east-1",
  host: "examplebucket.s3.amazonaws.com",
  emptyPayload: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  now: new Date("2013-05-24T00:00:00Z"),
}

test("signs the AWS GET Object example correctly", () => {
  const { signature } = signRequest({
    method: "GET",
    host: AWS_EXAMPLE.host,
    canonicalUri: "/test.txt",
    payloadHash: AWS_EXAMPLE.emptyPayload,
    headers: { range: "bytes=0-9" },
    accessKeyId: AWS_EXAMPLE.accessKeyId,
    secretAccessKey: AWS_EXAMPLE.secretAccessKey,
    region: AWS_EXAMPLE.region,
    now: AWS_EXAMPLE.now,
  })

  assert.equal(signature, "f0e8bdb87c964420e857bd35b5d6ed310bd44f0170aba48dd91039c6036bdb41")
})

test("signs the AWS list-objects example (query string canonicalization)", () => {
  const { signature } = signRequest({
    method: "GET",
    host: AWS_EXAMPLE.host,
    canonicalUri: "/",
    query: { "max-keys": "2", prefix: "J" },
    payloadHash: AWS_EXAMPLE.emptyPayload,
    accessKeyId: AWS_EXAMPLE.accessKeyId,
    secretAccessKey: AWS_EXAMPLE.secretAccessKey,
    region: AWS_EXAMPLE.region,
    now: AWS_EXAMPLE.now,
  })

  assert.equal(signature, "34b48302e7b5fa45bde8084f4b7868a86f0a534bc59db6670ed5711ef69dc6f7")
})

test("emits an Authorization header in the expected shape", () => {
  const { headers } = signRequest({
    method: "PUT",
    host: "acct.r2.cloudflarestorage.com",
    canonicalUri: "/bucket/thoughts/images/a.png",
    payloadHash: AWS_EXAMPLE.emptyPayload,
    accessKeyId: "AKID",
    secretAccessKey: "SECRET",
    now: AWS_EXAMPLE.now,
  })

  assert.match(
    headers.Authorization,
    /^AWS4-HMAC-SHA256 Credential=AKID\/20130524\/auto\/s3\/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=[0-9a-f]{64}$/,
  )
  assert.equal(headers["x-amz-date"], "20130524T000000Z")
})
