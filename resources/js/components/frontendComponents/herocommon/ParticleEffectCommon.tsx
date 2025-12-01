import React, { useEffect, useRef } from "react";
import "./ParticleEffectCommon.css";

const ParticleEffectCommon: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let outerParticles: OuterParticle[] = [];
        let innerParticles: InnerParticle[] = [];

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const outerRadius = 170;
        const innerRadius = 160;
        const maxDistance = 450;

        const outerParticleCount = 1;
        const innerParticleCount = 2;

        class OuterParticle {
            ctx: CanvasRenderingContext2D;
            angle: number;
            distance: number;
            speed: number;
            opacity: number;
            size: number;
            direction: number;

            constructor(ctx: CanvasRenderingContext2D) {
                this.ctx = ctx;
                this.angle = Math.random() * Math.PI * 2;
                this.distance = outerRadius + Math.random() * 10;
                this.speed = Math.random() * 0.1 + 0.02;
                this.opacity = 1;
                this.size = Math.random() * 0.3 + 0.5;
                this.direction = Math.random() > 0.5 ? 1 : -1;
            }

            update() {
                this.distance += this.speed * this.direction;
                this.opacity -= 0.005;

                if (
                    this.distance < innerRadius ||
                    this.distance > maxDistance ||
                    this.opacity <= 0
                ) {
                    this.reset();
                }
            }

            reset() {
                this.angle = Math.random() * Math.PI * 2;
                this.distance = outerRadius + Math.random() * 10;
                this.speed = Math.random() * 0.1 + 0.02;
                this.opacity = 1;
                this.size = Math.random() * 0.2 + 0.5;
                this.direction = Math.random() > 0.5 ? 1 : -1;
            }

            draw() {
                const x = centerX + Math.cos(this.angle) * this.distance;
                const y = centerY + Math.sin(this.angle) * this.distance;

                this.ctx.beginPath();
                this.ctx.arc(x, y, this.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(0, 150, 255, ${this.opacity})`;
                this.ctx.fill();
            }
        }


        class InnerParticle {
            ctx: CanvasRenderingContext2D;
            x: number;
            y: number;
            speedX: number;
            speedY: number;
            opacity: number;
            size: number;

            constructor(ctx: CanvasRenderingContext2D) {
                this.ctx = ctx;
                this.x = centerX + (Math.random() * innerRadius * 2 - innerRadius);
                this.y = centerY + (Math.random() * innerRadius * 2 - innerRadius);
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.opacity = 1;
                this.size = Math.random() * 0.2 + 0.5;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                const dx = this.x - centerX;
                const dy = this.y - centerY;

                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist > innerRadius) {
                    this.x = centerX + (dx / dist) * innerRadius;
                    this.y = centerY + (dy / dist) * innerRadius;
                }
            }

            draw() {
                this.ctx.beginPath();
                this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(0, 150, 255, ${this.opacity})`;
                this.ctx.fill();
            }
        }


        const createParticles = () => {
            for (let i = 0; i < 500; i++) {
                outerParticles.push(new OuterParticle(ctx));
            }
            for (let i = 0; i < 100; i++) {
                innerParticles.push(new InnerParticle(ctx));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            outerParticles.forEach((p) => {
                p.update();
                p.draw();
            });

            innerParticles.forEach((p) => {
                p.update();
                p.draw();
            });

            for (let i = 0; i < outerParticleCount; i++) {
                outerParticles.push(new OuterParticle(ctx));
            }
            for (let i = 0; i < innerParticleCount; i++) {
                innerParticles.push(new InnerParticle(ctx));
            }

            if (outerParticles.length > 1000) {
                outerParticles.splice(0, outerParticleCount);
            }
            if (innerParticles.length > 500) {
                innerParticles.splice(0, innerParticleCount);
            }

            requestAnimationFrame(animate);
        };

        createParticles();
        animate();

        return () => {
            outerParticles = [];
            innerParticles = [];
        };
    }, []);

    return (
        <div className="circle-warpper">
            <canvas ref={canvasRef} id="particleCanvas"></canvas>

            {[...Array(30)].map((_, index) => (
                <div key={index} className="animatted-circle"></div>
            ))}
        </div>
    );
};

export default ParticleEffectCommon;
