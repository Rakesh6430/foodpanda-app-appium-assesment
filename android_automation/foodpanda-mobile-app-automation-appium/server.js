const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const ROOT = __dirname;

// Serve allure report and the web UI
app.use('/report', express.static(path.join(ROOT, 'allure-report')));
app.use(express.static(path.join(ROOT, 'public')));

// Return sorted list of spec files
app.get('/api/specs', (req, res) => {
    const dir = path.join(ROOT, 'test', 'specs');
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort();
    res.json(files);
});

// Run a spec (or all specs) and stream output via Server-Sent Events
app.get('/api/run', (req, res) => {
    const { spec } = req.query;

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });

    const send = (obj) => res.write(`data: ${JSON.stringify(obj)}\n\n`);

    const args = ['wdio', 'run', 'wdio.conf.js'];
    if (spec) args.push('--spec', `test/specs/${spec}`);

    // SKIP_ALLURE_OPEN prevents wdio.conf.js onComplete from blocking with allure open
    const env = { ...process.env, SKIP_ALLURE_OPEN: '1' };
    const proc = spawn('npx', args, { cwd: ROOT, env, shell: true });

    send({ type: 'start', spec: spec || null });

    proc.stdout.on('data', d => send({ type: 'log', text: d.toString() }));
    proc.stderr.on('data', d => send({ type: 'log', text: d.toString() }));

    proc.on('close', exitCode => {
        send({ type: 'generating' });
        const allure = spawn(
            'npx',
            ['allure', 'generate', 'allure-results', '--clean', '-o', 'allure-report'],
            { cwd: ROOT, env, shell: true }
        );
        allure.stdout.on('data', d => send({ type: 'log', text: d.toString() }));
        allure.stderr.on('data', d => send({ type: 'log', text: d.toString() }));
        allure.on('close', () => {
            send({ type: 'done', exitCode });
            res.end();
        });
    });

    // Kill the test process if the browser disconnects
    req.on('close', () => proc.kill('SIGTERM'));
});

app.listen(PORT, () => {
    console.log(`\n  Shikho Test Runner  →  http://localhost:${PORT}\n`);
});
