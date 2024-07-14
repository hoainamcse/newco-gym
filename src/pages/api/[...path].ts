// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer({
  target: process.env.NEXT_PUBLIC_API_URL,
  changeOrigin: true,
  selfHandleResponse: false,
  ws: true,
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    req.headers.cookie = "";

    // Remove the '/api' prefix from the request URL
    if (req.url?.startsWith("/api")) {
      req.url = req.url.slice(4);
    }

    proxy.web(req, res);

    proxy.once("proxyRes", (proxyRes, req, res) => {
      let body = "";
      proxyRes.on("data", (chunk) => {
        body += chunk;
      });

      proxyRes.on("end", () => {
        (res as NextApiResponse).status(proxyRes.statusCode || 200).json(JSON.parse(body));
        resolve(true);
      });
    });

    proxy.once("error", (error) => {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(
        "Something went wrong. And we are reporting a custom error message.",
      );
      reject(error)
    });
    res.on('close', () => {
      proxy.removeAllListeners('proxyRes');
      proxy.removeAllListeners('error');
    });
  });
}
