import { Skeleton } from "@mui/material";

const DetailedInvoiceSkeleton = () => {
    return (
        <>
            <div className="invoice-details-crud">
                <div className="invoice-details-status">
                    <Skeleton
                        animation="wave"
                        variant="rounded"
                        width={60}
                        height={18}
                    />
                    <Skeleton
                        animation="wave"
                        variant="rounded"
                        sx={{ borderRadius: "6px" }}
                        width={80}
                        height={36}
                    />
                </div>
                <div className="invoice-details-edit">
                    <Skeleton
                        animation="wave"
                        variant="rounded"
                        sx={{ borderRadius: 100 }}
                        width={72}
                        height={45}
                    />
                    <Skeleton
                        animation="wave"
                        variant="rounded"
                        sx={{ borderRadius: 100 }}
                        width={88}
                        height={45}
                    />
                    <Skeleton
                        animation="wave"
                        variant="rounded"
                        sx={{ borderRadius: 100 }}
                        width={132}
                        height={45}
                    />
                </div>
            </div>
            <div className="invoice-details">
                <div className="invoice-details-header">
                    <div className="invoice-details-meta">
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={62}
                            height={14}
                        />
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={100}
                            height={10}
                        />
                    </div>
                    <div className="invoice-details-vendor-info">
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={120}
                            height={10}
                        />
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={75}
                            height={10}
                        />
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={40}
                            height={10}
                        />
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={60}
                            height={10}
                        />
                    </div>
                </div>
                <div className="invoice-details-body">
                    <div className="invoice-details-dates">
                        <div className="invoice-details-date">
                            <Skeleton
                                animation="wave"
                                variant="rounded"
                                width={65}
                                height={10}
                            />
                            <Skeleton
                                animation="wave"
                                variant="rounded"
                                width={80}
                                height={14}
                            />
                        </div>
                        <div className="invoice-details-due-date">
                            <Skeleton
                                animation="wave"
                                variant="rounded"
                                width={65}
                                height={10}
                            />
                            <Skeleton
                                animation="wave"
                                variant="rounded"
                                width={80}
                                height={14}
                            />
                        </div>
                    </div>
                    <div className="invoice-details-client-info">
                        <div className="invoice-details-client-name">
                            <Skeleton
                                animation="wave"
                                variant="rounded"
                                width={36}
                                height={10}
                            />
                            <Skeleton
                                animation="wave"
                                variant="rounded"
                                width={80}
                                height={14}
                            />
                        </div>
                        <div className="invoice-details-client-address">
                            <Skeleton
                                animation="wave"
                                variant="rounded"
                                width={120}
                                height={10}
                            />
                            <Skeleton
                                animation="wave"
                                variant="rounded"
                                width={75}
                                height={10}
                            />
                            <Skeleton
                                animation="wave"
                                variant="rounded"
                                width={40}
                                height={10}
                            />
                            <Skeleton
                                animation="wave"
                                variant="rounded"
                                width={60}
                                height={10}
                            />
                        </div>
                    </div>
                    <div className="invoice-details-client-email-skeleton">
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={40}
                            height={10}
                        />
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={120}
                            height={14}
                        />
                    </div>
                </div>
                <div className="invoice-details-footer">
                    <div className="invoice-details-footer-pricing">
                        <div className="invoice-details-footer-pricing-header">
                            <p></p>
                            <div
                                style={{ justifyContent: "center" }}
                                className="skeleton-invoice-details-footer"
                            >
                                <Skeleton
                                    animation="wave"
                                    variant="rounded"
                                    width={26}
                                    height={14}
                                />
                            </div>
                            <div className="skeleton-invoice-details-footer">
                                <Skeleton
                                    animation="wave"
                                    variant="rounded"
                                    width={30}
                                    height={14}
                                />
                            </div>
                            <div className="skeleton-invoice-details-footer">
                                <Skeleton
                                    animation="wave"
                                    variant="rounded"
                                    width={30}
                                    height={14}
                                />
                            </div>
                        </div>
                        {[0, 1].map((item, ind) => (
                            <div
                                key={ind}
                                className="invoice-details-footer-pricing-item-skeleton"
                            >
                                <div>
                                    <Skeleton
                                        animation="wave"
                                        variant="rounded"
                                        width={75}
                                        height={14}
                                    />
                                </div>
                                <div>
                                    <Skeleton
                                        animation="wave"
                                        variant="rounded"
                                        width={14}
                                        height={14}
                                    />
                                </div>
                                <div>
                                    <Skeleton
                                        animation="wave"
                                        variant="rounded"
                                        width={48}
                                        height={14}
                                    />
                                </div>
                                <div>
                                    <Skeleton
                                        animation="wave"
                                        variant="rounded"
                                        width={48}
                                        height={14}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="invoice-details-footer-due">
                        <Skeleton
                            className="light-skeleton"
                            animation="wave"
                            variant="rounded"
                            width={72}
                            height={14}
                        />
                        <Skeleton
                            className="light-skeleton"
                            animation="wave"
                            variant="rounded"
                            width={72}
                            height={18}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailedInvoiceSkeleton;
